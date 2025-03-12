import { Mongo } from "meteor/mongo";
import { TaskModel } from "./TaskModel";

export const TasksCollection = new Mongo.Collection<TaskModel>("tasks");
