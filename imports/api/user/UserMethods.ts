// Define métodos para atualizar perfil e permissões

import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { User, UserProfile } from "./UserTypes";

Meteor.methods({

  "user.create"(userData: User, password: string) {
    if (!userData.email || !password) {
      throw new Meteor.Error('invalid-arguments', 'Username, email, and password are required');
    }

    const userId = Accounts.createUser({
      email: userData.email,
      password: password,
      profile: userData.profile,
    });

    return userId;
  },

  "user.update"(profile: UserProfile) {
    if (!this.userId) throw new Meteor.Error("not-authorized");
    Meteor.users.updateAsync(this.userId, { $set: { profile } });
  },
});
