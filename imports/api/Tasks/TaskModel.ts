export enum TaskStatusModel {
  REGISTERED = "REGISTERED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface TaskModel {
  _id?: string;
  userId?: string;
  userName?: string;
  title: string;
  description: string;
  status: TaskStatusModel;
  private: boolean,
  lastModified: Date;
  createdAt: Date;
}
