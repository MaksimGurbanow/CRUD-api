import { ServerResponse } from "http";

export enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export interface User {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type UserToOperation = Omit<User, 'id'>;

export interface UserOperation {
  data: User | User[] | string | undefined;
  statusCode: number;
  statusMessage: string;
}

export interface SendErrorArguments {
  response: ServerResponse;
  err: unknown;
}

export interface SendResultArguments {
  response: ServerResponse;
  result: UserOperation;
}
