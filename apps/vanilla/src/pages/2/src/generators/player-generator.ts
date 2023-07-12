import { MAX_SCORE } from '../utils/consts';
import { IDiceResult, IDisplayData, IObserver } from './types';
import { Publisher } from './publisher';

export class PlayerGenerator extends Publisher<IDisplayData> implements IObserver<IDiceResult> {
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

  update(value: IDiceResult) {
    if (value.currentPlayerIndex === this.index) {
      this.points = value.result;
      this.pointsSum += value.result;
      if (this.pointsSum >= MAX_SCORE) {
        this.isWin = true;
      }
      this.notify({ isWin: this.isWin, pointsSum: this.pointsSum, points: this.points });
    }
    if (value.nextPlayerIndex === this.index) {
      this.notify({ isWin: this.isWin, isNext: true, pointsSum: this.pointsSum, points: this.points });
    }
  }

  public constructor(name: string, index: number) {
    super();
    this.name = name;
    this.index = index;
    this._points = [];
    this.isWin = false;
    this.pointsSum = 0;
  }
}
