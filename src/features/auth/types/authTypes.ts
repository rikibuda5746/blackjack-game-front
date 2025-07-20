import { User } from './userTypes';

export type AuthState = {
  user: User | null;
};

export type AuthError = {
  message: string;
  code?: string;
};