export interface Observer<T> {
  update: (value: T) => void;
}
export interface RoundResult {
  result: number;
  currentPlayerIndex: number;
  nextPlayerIndex: number;
}

export interface DisplayTurn {
  isWin?: boolean;
  isNext?: boolean;
  pointsSum: number;
  points: number[];
}

export interface PlayerTurn {
  currentPlayerIndex: number;
  nextPlayerIndex: number;
}
