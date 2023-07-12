import { IObserver, Publisher } from './publisher';
import { ITurn } from './turn-generator';

export interface IDice {
  result: number;
  currentPlayerIndex: number;
}

export class DiceGenerator extends Publisher<IDice> implements IObserver<ITurn> {
  public constructor() {
    super();
  }

  private getRandomValue() {
    return Math.floor(Math.random() * 6);
  }

  update(value: ITurn) {
    const result = this.getRandomValue();
    this.notify({ result, currentPlayerIndex: value.currentPlayerIndex });
  }
}
