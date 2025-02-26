// Publica dados do usuário autenticado

import { Meteor } from "meteor/meteor";
import { UsersCollection } from "./UsersCollection";

Meteor.publish("userData", function () {
  if (!this.userId) return this.ready();
  return UsersCollection.find(
    { _id: this.userId },
    { fields: { username: 1, profile: 1 } } // 1 -> inclui os campos username e profile
  );
});
