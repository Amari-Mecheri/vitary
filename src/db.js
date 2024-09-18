// src/db.js
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { addRxPlugin } from 'rxdb/plugins/core';
import { replicateCouchDB } from 'rxdb/plugins/replication-couchdb';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';

// Add RxDB plugins
addRxPlugin(RxDBLeaderElectionPlugin);

// Define the sync URL for CouchDB and credentials
const syncURL = 'http://localhost:10102/vitary-server/'; // Update this if needed
const adminCredentials = 'admin:admin'; // Your admin credentials

// Custom fetch method with Basic Auth
const myCustomFetch = (url, options) => {
    // Clone the options to avoid mutating the original
    const optionsWithAuth = { ...options };
    if (!optionsWithAuth.headers) {
        optionsWithAuth.headers = {};
    }
    // Add Basic Auth header
    optionsWithAuth.headers['Authorization'] = 'Basic ' + btoa(adminCredentials);

    // Perform the fetch with modified options
    return fetch(url, optionsWithAuth);
};

let dbPromise = null;

const _create = async () => {
    console.log('DatabaseService: creating database..');

    // Check if the CouchDB database exists
    let dbExists = false;
    try {
        const response = await myCustomFetch(syncURL);
        if (response.ok) {
            dbExists = true;
        }
    } catch (err) {
        console.log('Error checking if database exists:', err);
    }

    const db = await createRxDatabase({
        name: 'vitary-server',
        storage: getRxStorageDexie(),
        multiInstance: true,  // enable multi-user support
    });

    if (!dbExists) {
        console.log('DatabaseService: creating CouchDB database..');
        try {
            await myCustomFetch(syncURL, {
                method: 'PUT'
            });
        } catch (err) {
            console.error('Failed to create CouchDB database:', err);
        }
    } else {
        console.log('DatabaseService: database already exists');
    }

    console.log('DatabaseService: created or opened database');
    window['db'] = db; // write to window for debugging

    // Show leadership in title
    db.waitForLeadership().then(() => {
        console.log('isLeader now');
        document.title = '♛ ' + document.title;
    });

    // Create collections
    console.log('DatabaseService: create collections');
    await db.addCollections({
        users: {
            schema: {
                title: 'user schema',
                version: 0,
                description: 'Schema for Vitary users',
                primaryKey: '_id',
                type: 'object',
                properties: {
                    _id: { type: 'string', maxLength: 100 },
                    username: { type: 'string' },
                    passwordHash: { type: 'string' },
                    roles: { type: 'array', items: { type: 'string' } }
                },
                required: ['_id', 'username', 'passwordHash', 'roles']
            },
        }
    });

    // Hooks
    console.log('DatabaseService: add hooks');
    db.collections.users.preInsert(docObj => {
        const { username } = docObj;
        return db.collections.users.findOne({
            selector: { username }
        }).exec().then(has => {
            if (has !== null) {
                console.error('another user already has the username ' + username);
                throw new Error('username already taken');
            }
            return db;
        });
    });

    // Sync with CouchDB
    console.log('DatabaseService: sync');

    Object.values(db.collections).forEach(col => {
        const url = syncURL + col.name + '/';
        console.log('url: ' + url);

        const replicationState = replicateCouchDB({
            replicationIdentifier: `replication-${col.name}`, // Ensure unique replication identifiers
            collection: col,
            url,
            live: true,
            pull: { batchSize: 60 },
            push: { batchSize: 60 },
            autoStart: true,
            fetch: myCustomFetch // Use the custom fetch method with authentication
        });

        replicationState.error$.subscribe(err => {
            console.error('Replication error:', err);
        });
    });

    return db;
};

export const initializeDatabase = () => {
    if (!dbPromise) {
        dbPromise = _create();
    }
    return dbPromise;
};
