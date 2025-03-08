import { Meteor } from 'meteor/meteor';

import '../imports/api/User/UserMethods';
import '../imports/api/User/UserPublication';
import '../imports/api/Tasks/TaskMethods';
import '../imports/api/Tasks/TaskPublication';

Meteor.startup(async () => { console.log('SERVER RUNNING...')});
