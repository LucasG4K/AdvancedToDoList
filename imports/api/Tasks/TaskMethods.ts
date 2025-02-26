// Define métodos para as tarefas -> ações no SERVIDOR (CRUD), exluindo o READ que é o método Publish

import { Meteor } from "meteor/meteor";
import { Task, TaskStatus } from "./TaskTypes";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "task.insert"(task: Task) {
    if (!this.userId) throw new Meteor.Error("not-authorized");
    return TasksCollection.insertAsync({ ...task, userId: this.userId });
  },

  "task.status"({ _id, taskStatus }: { _id: string; taskStatus: TaskStatus }) {
    if (!this.userId) throw new Meteor.Error("not-authorized");

    const task = TasksCollection.findOne(_id);
    if (task?.userId !== this.userId)
      throw new Meteor.Error(
        "not-authorized",
        "You can only edit your own tasks."
      );

    return TasksCollection.updateAsync(_id, {
      $set: { status: taskStatus },
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
