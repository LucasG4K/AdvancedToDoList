import { Meteor } from 'meteor/meteor';

import '../imports/api/user/UserMethods';
import '../imports/api/Tasks/TaskPublication';

Meteor.startup(async () => { console.log('SERVER RUNNING...')});
