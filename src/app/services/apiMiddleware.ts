import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import storageService from './storageService';
import { authApi } from '@features/auth/api/authApi';
import { RefreshTokenRequest, RefreshTokenResponse } from '@features/auth/types';

const refreshToken = async (api: any): Promise<string | null> => {
  try {
    const refreshToken = storageService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('Missing refresh token');
    }
    const refreshRequest: RefreshTokenRequest = { refreshToken };
    const result = await api.dispatch(
      authApi.endpoints.refreshToken.initiate(refreshRequest)
    );
    if (result.data) {
      const data = result.data as RefreshTokenResponse;
      storageService.setTokens({  accessToken: data.accessToken, refreshToken: data.refreshToken});
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
  return null;
};

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    prepareHeaders: (headers) => {
      const token = storageService.getAccessToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

export const apiMiddleware: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 800) {
    console.log('error 800');
    try {
      await refreshToken(api);
    } catch (error) {
      // to do
      console.error('Failed to refresh token:', error);
      storageService.clearTokens();
    //   window.location.href = '/login';
      return result;
    }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
}; 