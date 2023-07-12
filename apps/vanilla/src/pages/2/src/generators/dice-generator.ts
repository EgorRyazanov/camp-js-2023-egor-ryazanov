import { MAX_DICE_RESULT, MIN_DICE_RESULT } from "../utils/consts";
import { Publisher } from "./publisher";
import { IDiceResult, IObserver, IPlayerTurn } from "./types";

export class DiceGenerator extends Publisher<IDiceResult> implements IObserver<IPlayerTurn> {
  public constructor() {
    super();
  }

  private getRandomValue() {
    return Math.floor(Math.random() * (MAX_DICE_RESULT + 1 - MIN_DICE_RESULT) + MIN_DICE_RESULT);
  }

  update(value: IPlayerTurn) {
    const result = this.getRandomValue();
    this.notify({ result, currentPlayerIndex: value.currentPlayerIndex, nextPlayerIndex: value.nextPlayerIndex });
  }
}
