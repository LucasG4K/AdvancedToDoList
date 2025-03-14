// Define métodos para as tarefas -> ações no SERVIDOR (CRUD), exluindo o READ que é o método Publish

import { Meteor } from "meteor/meteor";
import { TaskModel, TaskStatusModel } from "./TaskModel";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "task.insert"(task: TaskModel) {
    if (!this.userId) throw new Meteor.Error("not-authorized");
    return TasksCollection.insertAsync({ ...task, userId: this.userId });
  },

  async "task.edit"(_id: string, task: TaskModel) {
    if (!this.userId) throw new Meteor.Error("not-authorized");

    const findTask = await TasksCollection.findOneAsync(_id);
    if (!findTask) throw new Meteor.Error("not-found", "Task not found.");

    return TasksCollection.updateAsync(_id, {
      $set: {...task}
    });
  },

  async "task.status"({ _id, taskStatus }: { _id: string; taskStatus: TaskStatusModel }) {
    if (!this.userId) throw new Meteor.Error("not-authorized");

    const task = await TasksCollection.findOneAsync(_id);
    if (!task) throw new Meteor.Error("not-found", "Task not found.");

    return TasksCollection.updateAsync(_id, {
      $set: { status: taskStatus, lastModified: new Date() },
    });
  },

  async "task.delete"({ _id }: { _id: string }) {
    if (!this.userId) throw new Meteor.Error("not-authorized");

    const findTask = await TasksCollection.findOneAsync(_id);
    if (!findTask) throw new Meteor.Error("not-found", "Task not found.");

    if (findTask?.userId !== this.userId)
      throw new Meteor.Error(
        "not-authorized",
        "You can only edit your own tasks."
      );
    return TasksCollection.removeAsync(_id);
  },
});
