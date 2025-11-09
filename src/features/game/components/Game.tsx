import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/store/store';
import { useStartGameMutation, useHitMutation, useStandMutation } from '../api/gameApi';
import { setGame, clearGame } from '../store/gameSlice';
import { GameStatus } from '../types/apiTypes';
import styles from './Game.module.scss';

const Game = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game.currentGame);

  const [bet, setBet] = useState(10);
  const [error, setError] = useState('');
  const [startGame] = useStartGameMutation();
  const [hit] = useHitMutation();
  const [stand] = useStandMutation();

  const handleStart = async () => {
    try {
      const response = await startGame({ betAmount: bet }).unwrap();
      dispatch(setGame(response));
    }
    catch (err: any) {
      setError('Failed to start game. Please try again.');
    }
  };

  const handleHit = async () => {
    if (!game) return;
    const response = await hit({ gameId: game.gameId }).unwrap();
    dispatch(setGame(response));
  };

  const handleStand = async () => {
    if (!game) return;
    const response = await stand({ gameId: game.gameId }).unwrap();
    dispatch(setGame(response));
  };

  const getCardClass = (card: string) => {
    const suit = card.slice(-1);
    return suit === '♥' || suit === '♦' ? styles.cardRed : styles.cardBlack;
  };

  const getStatusClass = () => {
    if (game?.status === GameStatus.PLAYING) return styles.statusPlaying;
    if (game?.status === GameStatus.FINISHED) return styles.statusFinished;
    return '';
  };

  const getResultClass = () => {
    if (!game?.result) return '';
    if (game.result.toLowerCase().includes('win')) return styles.resultWin;
    if (game.result.toLowerCase().includes('lose')) return styles.resultLose;
    return styles.resultPush;
  };

  return (
    <div className={styles.gameContainer}>
      {error && <div className={styles.error}>{error}</div>}
      {!game && (
        <div className={styles.gameSetup}>
          <h2>🎰 Blackjack Game</h2>
          <div className={styles.betSection}>
            <label htmlFor="bet">Place Your Bet:</label>
            <input
              id="bet"
              type="number"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              className={styles.betInput}
              min="1"
              max="1000"
            />
          </div>
          <button onClick={handleStart} className={styles.btnPrimary}>
            Start Game
          </button>
        </div>
      )}

      {game && (
        <div className={styles.gameBoard}>
          <div className={styles.gameHeader}>
            <h2>🎲 Blackjack Game</h2>
          </div>

          <div className={styles.cardsSection}>
            <div className={styles.playerSection}>
              <h3>👤 Your Cards</h3>
              <div className={styles.cardsDisplay}>
                {game.playerCards.map((card, index) => (
                  <div
                    key={index}
                    className={`${styles.card} ${getCardClass(card)} ${styles.cardDealing}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {card}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.dealerSection}>
              <h3>🎭 Dealer Cards</h3>
              <div className={styles.cardsDisplay}>
                {game.dealerCards.map((card, index) => (
                  <div
                    key={index}
                    className={`${styles.card} ${getCardClass(card)} ${styles.cardDealing}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {card}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.gameStatus} ${getStatusClass()}`}>
            Status: {game.status}
          </div>

          {game.result && (
            <div className={`${styles.gameResult} ${getResultClass()}`}>
              {game.result}
            </div>
          )}

          {game.status === GameStatus.PLAYING && (
            <div className={styles.actionButtons}>
              <button onClick={handleHit} className={styles.btnSecondary}>
                Hit
              </button>
              <button onClick={handleStand} className={styles.btnDanger}>
                Stand
              </button>
            </div>
          )}

          {game.status === GameStatus.FINISHED && (
            <div className={styles.actionButtons}>
              <button onClick={() => dispatch(clearGame())} className={styles.btnNewGame}>
                New Game
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
