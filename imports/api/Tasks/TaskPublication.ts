import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function () {
  return TasksCollection.find({ $or: [ {private: false}, {userId: this.userId!}] });
});
