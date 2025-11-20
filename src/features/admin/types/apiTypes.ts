import { AdminUser } from "./usersTypes";
export type creditUserRequest = {
  userId: number;
  amount: number;
};

export type debitUserRequest = {
  userId: number;
  amount: number;
};

export type getUsersResponse = {
  data : AdminUser[];
};
