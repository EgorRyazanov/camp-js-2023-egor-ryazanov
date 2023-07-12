export interface IObserver<T> {
  update: (value: T) => void;
}
// поменять название на RoundResult
export interface IDiceResult {
  result: number;
  currentPlayerIndex: number;
  nextPlayerIndex: number;
}

export interface IDisplayData {
  isWin?: boolean;
  isNext?: boolean;
  pointsSum: number;
  points: number[];
}

export interface IPlayerTurn {
  currentPlayerIndex: number;
  nextPlayerIndex: number;
}
