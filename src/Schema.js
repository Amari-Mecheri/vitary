export const userSchema = {
    title: 'user schema',
    description: 'describes a user with role and password',
    version: 0,
    primaryKey: '_id', // Changed from 'name' to '_id' to match typical CouchDB primary key usage
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            maxLength: 100
        },
        role: {
            type: 'string',
            enum: ['admin', 'user'] // Define the roles allowed
        },
        password: {
            type: 'string'
        }
    },
    required: [
        '_id', // Ensure the document has a unique identifier
        'role',
        'password'
    ]
};
