// Publica dados do usuário autenticado

import { Meteor } from "meteor/meteor";

Meteor.publish("users", function () {
  if (!this.userId) throw new Meteor.Error("not-authorized");
  return Meteor.users.find();
});
