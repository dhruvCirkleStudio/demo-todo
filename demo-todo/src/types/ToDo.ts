export interface ToDo {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export interface newTodoType {
  title: string;
  description: string;
}
