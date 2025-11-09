export enum GameStatus {
    PLAYING = 'playing',
    BUST = 'bust',
    BLACKJACK = 'blackjack',
    FINISHED = 'finished',
}
  
export enum GameResult {
    WIN = 'win',
    LOSE = 'lose',
    DRAW = 'draw',
}

export type StartGameRequest = {
  betAmount: number;
};

export type HitGameRequest = {
  gameId: number;
};

export type StandGameRequest = {
  gameId: number;
};

export type GameResponse = {
  gameId: number;
  playerCards: string[];
  dealerCards: string[];
  status: GameStatus;
  result?: GameResult;
};
