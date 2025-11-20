import { User } from "@features/auth/types/userTypes";

export type AdminUser = {
  user : User;
  balance: number;
};