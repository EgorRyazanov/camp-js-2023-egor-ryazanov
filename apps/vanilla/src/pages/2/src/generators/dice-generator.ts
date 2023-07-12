import { MAX_DICE_RESULT, MIN_DICE_RESULT } from '../utils/consts';
import { Publisher } from './publisher';
import { RoundResult, Observer, PlayerTurn } from './types';

export class DiceGenerator extends Publisher<RoundResult> implements Observer<PlayerTurn> {
  public constructor() {
    super();
  }

  private getRandomValue() {
    return Math.floor(Math.random() * (MAX_DICE_RESULT + 1 - MIN_DICE_RESULT) + MIN_DICE_RESULT);
  }

  update(value: PlayerTurn) {
    const result = this.getRandomValue();
    this.notify({ result, currentPlayerIndex: value.currentPlayerIndex, nextPlayerIndex: value.nextPlayerIndex });
  }
}
