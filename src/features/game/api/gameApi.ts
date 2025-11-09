

import { createApi } from '@reduxjs/toolkit/query/react';
import { apiMiddleware } from '@app/services/apiMiddleware';
import { StartGameRequest, HitGameRequest, StandGameRequest, GameResponse } from '@features/game/types';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: apiMiddleware,
  endpoints: (builder) => ({
    startGame: builder.mutation<GameResponse, StartGameRequest>({
      query: (body) => ({
        url: '/game/start',
        method: 'POST',
        body: body,
      }),
    }),
    hit: builder.mutation<GameResponse, HitGameRequest>({
      query: (body) => ({
        url: '/game/hit',
        method: 'POST',
        body: body,
      }),
    }),
    stand: builder.mutation<GameResponse, StandGameRequest>({
      query: (body) => ({
        url: '/game/stand',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useStartGameMutation, useHitMutation, useStandMutation } = gameApi;
