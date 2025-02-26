// Define a coleção MongoDB para usuários

import { Mongo } from 'meteor/mongo';
import { User } from './UserTypes';

export const UsersCollection = new Mongo.Collection<User>('users');