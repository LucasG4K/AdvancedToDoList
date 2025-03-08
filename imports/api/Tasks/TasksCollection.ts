import { Mongo } from "meteor/mongo";
import { TaskModel } from "./TaskTypes";

export const TasksCollection = new Mongo.Collection<TaskModel>("tasks");
