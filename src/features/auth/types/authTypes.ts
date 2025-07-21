import { User } from './userTypes';

export type AuthState = {
  user: User | null;
  isAuthenticated : boolean
};

export type AuthError = {
  message: string;
  code?: string;
};