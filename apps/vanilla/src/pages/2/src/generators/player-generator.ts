import { MAX_SCORE } from '../utils/consts';
import { IDice } from './dice-generator';
import { IObserver, Publisher } from './publisher';

export interface IDisplayData {
  isWin: boolean;
  pointsSum: number;
  points: number[];
}

export class PlayerModel extends Publisher<IDisplayData> implements IObserver<IDice> {
  public readonly name: string;
  private index: number;
  private _points: number[];
  private isWin: boolean;
  private pointsSum: number;

  public get points(): number[] {
    return this._points;
  }

  public set points(value: number) {
    this._points.push(value);
  }

  update(value: IDice) {
    if (value.currentPlayerIndex === this.index) {
      this.points = value.result;
      this.pointsSum += value.result;
      if (this.pointsSum >= MAX_SCORE) {
        this.isWin = true;
      }
      this.notify({ isWin: this.isWin, pointsSum: this.pointsSum, points: this.points });
    }
  }

  constructor(name: string, index: number) {
    super();
    this.name = name;
    this.index = index;
    this._points = [];
    this.isWin = false;
    this.pointsSum = 0;
  }
}
