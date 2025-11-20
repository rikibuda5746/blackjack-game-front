import { createApi } from '@reduxjs/toolkit/query/react';
import { apiMiddleware } from '@app/services/apiMiddleware';
import { getUsersResponse } from '../types/apiTypes';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: apiMiddleware,
  endpoints: (builder) => ({
    getAdminUsers: builder.mutation<getUsersResponse, void>({
      query: () => ({
        url: 'admin/users',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAdminUsersMutation } = adminApi;
