'use strict';

import Realm from 'realm';

class UserToken extends Realm.Object {}
UserToken.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
    		id: 'int',
        done: {type: 'bool', default: false},
        name: 'string',
        token: 'string',
    },
};

export default new Realm({schema: [UserToken]});
