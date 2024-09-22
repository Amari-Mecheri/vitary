export const roleSchema = {
    title: 'role schema',
    description: 'describes a user role with access to pages and specific permissions',
    version: 0,
    primaryKey: '_id',
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            maxLength: 100
        },
        name: {
            type: 'string',
            description: 'Name of the role, like admin, editor, etc.',
            maxLength: 50
        },
        allowedPages: {
            type: 'array',
            description: 'List of pages the role has access to',
            items: {
                type: 'object',
                properties: {
                    page: {
                        type: 'string',
                        description: 'Page path'
                    },
                    permissions: {
                        type: 'array',
                        description: 'List of permissions for this page',
                        items: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    required: [
        '_id',
        'name',
        'allowedPages'
    ]
};
