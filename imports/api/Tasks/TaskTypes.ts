export enum TaskStatus {
  REGISTERED = "REGISTERED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Task {
  _id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  status: TaskStatus;
  private: boolean,
  lastModified: Date;
  createdAt: Date;
}
