import { configureStore } from '@reduxjs/toolkit'
import { storeSlices } from './storeSlices'
import { apiSlices } from "./apiSlices";

export const store = configureStore({
  reducer: {
    ...storeSlices,
    ...apiSlices.reduce((acc, api) => {
      acc[api.reducerPath] = api.reducer;
      return acc;
    }, {} as Record<string, any>),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlices.map((api) => api.middleware)
    ) as any,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch