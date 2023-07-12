/** Interface for combining generators and their potential subscribers. */
export interface Observer<T> {
  update: (value: T) => void;
}

/** Interface of total information about current turn. */
export interface RoundResult {
  result: number;
  currentPlayerIndex: number;
  nextPlayerIndex: number;
}

/** Interface of player display information. */
export interface DisplayTurn {
  isWin?: boolean;
  isNext?: boolean;
  pointsSum: number;
  points: number[];
}

/** Interface of information about the turn order of players in the game. */
export interface PlayerTurn {
  currentPlayerIndex: number;
  nextPlayerIndex: number;
}
