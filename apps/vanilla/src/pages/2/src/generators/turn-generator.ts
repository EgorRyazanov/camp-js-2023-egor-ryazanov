import { Publisher } from './publisher';
import { PlayerTurn } from './types';

/** Turn generator */
export class TurnGenerator extends Publisher<PlayerTurn> {
  /** Index of player that made turn. */
  public currentPlayerIndex: number;

  /** Total players count. */
  public playerCount: number;

  public constructor(playerCount: number) {
    super();
    this.next = this.next.bind(this);

    this.playerCount = playerCount;
    this.currentPlayerIndex = -1;
  }

  /**
   * Calculate player index.
   * @param currentIndex The index on the basis of which calculations are performed.
   */
  private calculateIndex(currentIndex: number) {
    currentIndex += 1;
    if (this.playerCount === currentIndex) {
      currentIndex = 0;
    }
    return currentIndex;
  }

  /** Method to make turn. */
  public next() {
    this.currentPlayerIndex = this.calculateIndex(this.currentPlayerIndex);
    const nextPlayerIndex = this.calculateIndex(this.currentPlayerIndex);
    this.notify({ nextPlayerIndex, currentPlayerIndex: this.currentPlayerIndex });
  }
}
