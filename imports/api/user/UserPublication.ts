// Publica dados do usuário autenticado

import { Meteor } from "meteor/meteor";

Meteor.publish("users", function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find({}, {
      fields: { // 1 -> inclui os campos
        username: 1,
        email: 1,
        profile: 1,
      },
    } 
  );
});
