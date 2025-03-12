// Define métodos para atualizar perfil e permissões

import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { UserModel, UserProfile } from "./UserModel";

Meteor.methods({
  "user.create"(userData: UserModel, password: string) {
    if (!userData.email || !password) {
      throw new Meteor.Error(
        "invalid-arguments",
        "Email and Password are required"
      );
    }

    try {
      const userId = Accounts.createUser({
        username: userData.email.match(/^(.+)@[\w]+\.\w+$/)![1],
        email: userData.email,
        password: password,
        profile: userData.profile,
      });

      return userId;
    } catch (error) {
      throw new Meteor.Error('user-creation-failed', 'Failed to create user');
    }
  },

  "user.update"(profile: UserProfile) {
    if (!this.userId) throw new Meteor.Error("not-authorized");
    Meteor.users.updateAsync(this.userId, { $set: { profile } });
  },
});
