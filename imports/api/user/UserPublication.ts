// Publica dados do usuário autenticado

import { Meteor } from "meteor/meteor";

Meteor.publish("users", function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find(
    { _id: this.userId },
    { fields: { username: 1, profile: 1 } } // 1 -> inclui os campos username e profile
  );
});
