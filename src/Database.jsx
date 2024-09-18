import {
    createRxDatabase,
    addRxPlugin
} from 'rxdb';
import {
    getRxStorageDexie
} from 'rxdb/plugins/storage-dexie';
import { userSchema } from './Schema'; // Import the updated user schema
import { replicateCouchDB } from 'rxdb/plugins/replication-couchdb';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';

addRxPlugin(RxDBLeaderElectionPlugin);

// Credentials
const username = 'admin';
const password = 'admin';
const encodedCredentials = btoa(`${username}:${password}`);

const syncURL = 'http://' + window.location.hostname + ':5984/vitary-server/'; // Updated URL
console.log('host: ' + syncURL);

let dbPromise = null;

const _create = async () => {
    console.log('DatabaseService: creating database..');
    const db = await createRxDatabase({
        name: 'vitary-server',
        storage: getRxStorageDexie()
    });
    console.log('DatabaseService: created database');
    window['db'] = db; // write to window for debugging

    // show leadership in title
    db.waitForLeadership().then(() => {
        console.log('isLeader now');
        document.title = '♛ ' + document.title;
    });

    // create collections
    console.log('DatabaseService: create collections');
    await db.addCollections({
        users: {
            schema: userSchema,
            methods: {
                // Define any methods you need
            }
        }
    });

    // hooks
    console.log('DatabaseService: add hooks');
    db.collections.users.preInsert(docObj => {
        // Define any hooks you need
        return docObj;
    });

    // Create the default admin user
    console.log('DatabaseService: create default admin user');
    const adminUser = {
        _id: 'admin',
        role: 'admin',
        password: '$2a$10$4js226cjh7/uOoiAcRV1xe3meUNIrC88CImBqQlP9XC5ujD.2ixoi' // hashed password
    };

    const existingUser = await db.users.findOne({ selector: { _id: 'admin' } }).exec();
    if (!existingUser) {
        await db.users.insert(adminUser);
    }

    // Create the CouchDB database if it does not exist
    try {
        const response = await fetch(syncURL, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + encodedCredentials
            }
        });
        if (!response.ok && response.status !== 412) { // 412 means the database already exists
            throw new Error(`Error creating CouchDB database: ${response.statusText}`);
        }
    } catch (err) {
        console.error('Error creating database:', err);
    }

    // Sync collections
    console.log('DatabaseService: sync - start live');
    Object.entries(db.collections).forEach(([colName, collection]) => {
        console.log('Sync URL:', syncURL);
        console.log('Sync collection name:', colName);

        // Custom fetch function to add Authorization headers
        const myCustomFetch = (url, options) => {
            const optionsWithAuth = Object.assign({}, options);
            if (!optionsWithAuth.headers) {
                optionsWithAuth.headers = {};
            }
            optionsWithAuth.headers['Authorization'] = 'Basic ' + encodedCredentials;
            return fetch(url, optionsWithAuth);
        };

        // Replicate each collection
        const replicationState = replicateCouchDB({
            collection: collection,
            url: syncURL,
            live: true,
            fetch: myCustomFetch,
            pull: {
                batchSize: 10 // Adjust batchSize if needed
            },
            push: {
                batchSize: 10 // Adjust batchSize if needed
            },
            autoStart: true
        });

        replicationState.error$.subscribe(err => {
            console.error(`Replication error for collection ${colName}:`, err);
        });

        console.log(`Replication started for collection: ${colName}`);
    });

    return db;
};

export const get = () => {
    if (!dbPromise)
        dbPromise = _create();
    return dbPromise;
};
