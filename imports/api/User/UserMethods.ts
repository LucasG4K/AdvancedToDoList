// Define métodos para atualizar perfil e permissões

import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { UserModel, UserModelProfile } from "./UserModel";
import { check } from "meteor/check";

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
        username: userData.email.match(/^(.+)@[\w]+\.\w+$/)![1].trim(), // regex para extrair o username direto do email -> ex: nome123@email.com -> username=nome123
        email: userData.email.trim(),
        password: password.trim(),
        profile: {
          ...userData.profile,
          name: userData.profile.name.trim(),
        },
      });

      return userId;
    } catch (error) {
      throw new Meteor.Error("user-creation-failed", "Failed to create user");
    }
  },

  "user.update"(profile: UserModelProfile) {
    if (!this.userId) throw new Meteor.Error("not-authorized");
    Meteor.users.updateAsync(this.userId, {
      $set: {
        profile: {
          ...profile,
          name: profile.name.trim(),
        },
      },
    });
  },

  "user.changePassword"(oldPassword: string, newPassword: string) {
    if (!this.userId) throw new Meteor.Error("not-authorized");
    Accounts.changePassword(oldPassword, newPassword);
  },

  async "user.updateAvatar"(base64Image: string) {
    check(base64Image, String);

    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Meteor.users.updateAsync(this.userId, {
      $set: { "profile.avatar": base64Image },
    });
  },
});
