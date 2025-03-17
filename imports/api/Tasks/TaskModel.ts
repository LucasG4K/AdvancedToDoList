export enum TaskStatusModel {
  REGISTERED = "REGISTERED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface TaskModel {
  _id?: string;
  userId?: string;
  userName?: string;
  ownerImg?: string;
  title: string;
  description: string;
  due: Date | null;
  status: TaskStatusModel;
  private: boolean,
  lastModified: Date;
  createdAt: Date;
}
