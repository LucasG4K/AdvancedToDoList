import { Mongo } from "meteor/mongo";
import { Task } from "./TaskTypes";

export const TasksCollection = new Mongo.Collection<Task>("tasks");
