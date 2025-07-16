import { createApi } from '@reduxjs/toolkit/query/react';
import {  RegisterRequest, LoginByTokenRequest, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from '@features/auth/types';
import { apiMiddleware } from '@app/services/apiMiddleware';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiMiddleware,
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (newUser) => ({
        url: 'auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    loginByToken: builder.mutation<LoginResponse, LoginByTokenRequest>({
      query: (credentials) => ({
        url: 'auth/login-by-token',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (credentials) => ({
        url: 'auth/refresh',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLoginByTokenMutation, useRefreshTokenMutation } = authApi;
