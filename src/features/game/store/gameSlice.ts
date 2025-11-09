import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameResponse } from '../types';

type GameState = {
  currentGame: GameResponse | null;
};

const initialState: GameState = {
  currentGame: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameResponse>) => {
      state.currentGame = action.payload;
    },
    clearGame: (state) => {
      state.currentGame = null;
    },
  },
});

export const { setGame, clearGame } = gameSlice.actions;
export default gameSlice.reducer;
