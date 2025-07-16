import { User } from './userTypes';


export type RegisterRequest = {
  name: string;
  password: string;
  email: string;
}; 

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginByTokenRequest = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};