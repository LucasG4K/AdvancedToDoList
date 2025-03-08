// Define métodos para as tarefas -> ações no SERVIDOR (CRUD), exluindo o READ que é o método Publish

import { Meteor } from "meteor/meteor";
import { TaskModel, TaskStatusModel } from "./TaskTypes";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "task.insert"(task: TaskModel) {
    if (!this.userId) throw new Meteor.Error("not-authorized");
    return TasksCollection.insertAsync({ ...task, userId: this.userId });
  },

  async "task.status"({ _id, taskStatus }: { _id: string; taskStatus: TaskStatusModel }) {
    if (!this.userId) throw new Meteor.Error("not-authorized");

    const task = await TasksCollection.findOneAsync(_id);
    if (!task) throw new Meteor.Error("not-found", "Task not found.");

    return TasksCollection.updateAsync(_id, {
      $set: { status: taskStatus, lastModified: new Date() },
    });
  },

  "task.delete"({ _id }: { _id: string }) {
    if (!this.userId) throw new Meteor.Error("not-authorized");

    const task = TasksCollection.findOne(_id);
    if (task?.userId !== this.userId)
      throw new Meteor.Error(
        "not-authorized",
        "You can only edit your own tasks."
      );
    return TasksCollection.removeAsync(_id);
  },
});
