import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("userTasks", function () {
  const userId: string | null = this.userId;

  if (!userId) return this.ready(); // Se o usuário não estiver logado, não retorna nada
  return TasksCollection.find({ userId });
});

Meteor.publish("allTasks", function () {
  return TasksCollection.find({});
});
