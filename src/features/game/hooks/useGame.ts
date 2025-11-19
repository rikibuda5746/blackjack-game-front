import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/store/store';
import { useStartGameMutation, useHitMutation, useStandMutation } from '../api/gameApi';
import { setGame, clearGame } from '../store/gameSlice';

export const useGame = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game.currentGame);

  const [bet, setBet] = useState(10);
  const [error, setError] = useState('');

  const [startGameMutation] = useStartGameMutation();
  const [hitMutation] = useHitMutation();
  const [standMutation] = useStandMutation();

  const start = async () => {
    try {
      const response = await startGameMutation({ betAmount: bet }).unwrap();
      dispatch(setGame(response));
      setError('');
    } catch {
      setError('Failed to start game. Please try again.');
    }
  };

  const hit = async () => {
    if (!game) return;
    const response = await hitMutation({ gameId: game.gameId }).unwrap();
    dispatch(setGame(response));
  };

  const stand = async () => {
    if (!game) return;
    const response = await standMutation({ gameId: game.gameId }).unwrap();
    dispatch(setGame(response));
  };

  const newGame = () => {
    dispatch(clearGame());
  };

  return {
    game,
    bet,
    setBet,
    error,
    start,
    hit,
    stand,
    newGame,
  };
};
