import { Publisher } from './publisher';
import { IPlayerTurn } from './types';

export class TurnGenerator extends Publisher<IPlayerTurn> {
  public currentPlayerIndex: number;
  public playerCount: number;

  public constructor(playerCount: number) {
    super();
    this.next = this.next.bind(this);

    this.playerCount = playerCount;
    this.currentPlayerIndex = -1;
  }

  private calculateIndex(currentIndex: number) {
    currentIndex += 1;
    if (this.playerCount === currentIndex) {
      currentIndex = 0;
    }
    return currentIndex;
  }

  public next() {
    this.currentPlayerIndex = this.calculateIndex(this.currentPlayerIndex);
    const nextPlayerIndex = this.calculateIndex(this.currentPlayerIndex);
    this.notify({ nextPlayerIndex, currentPlayerIndex: this.currentPlayerIndex });
  }
}
