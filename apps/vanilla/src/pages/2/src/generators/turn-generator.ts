import { Publisher } from './publisher';

export interface ITurn {
  currentPlayerIndex: number;
}

export class TurnGenerator extends Publisher<ITurn> {
  public currentPlayerIndex: number;
  public playerCount: number;

  public constructor(playerCount: number) {
    super();
    this.next = this.next.bind(this);
    this.calculateIndex = this.calculateIndex.bind(this);

    this.playerCount = playerCount;
    this.currentPlayerIndex = 0;
  }

  private calculateIndex() {
    this.currentPlayerIndex += 1;
    if (this.playerCount === this.currentPlayerIndex) {
      this.currentPlayerIndex = 0;
    }
  }

  public next() {
    this.calculateIndex();
    this.notify({ currentPlayerIndex: this.currentPlayerIndex });
  }
}
