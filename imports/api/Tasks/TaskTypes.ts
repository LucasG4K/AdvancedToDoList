export enum TaskStatus {
  REGISTERED = "REGISTERED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Task {
  _id: string;
  userId?: string;
  title: string;
  description: string;
  status: TaskStatus;
  lastModified: Date;
  createdAt: Date;
}
