import { Publisher } from './publisher';
import { PlayerTurn } from './types';

/** Turn generator. */
export class TurnGenerator extends Publisher<PlayerTurn> {
	/** Index of player that made turn. */
	public currentPlayerIndex: number;

	/** Total players count. */
	public readonly playerCount: number;

	public constructor(playerCount: number) {
		super();
		this.playerCount = playerCount;
		this.currentPlayerIndex = -1;
	}

	/** Makes turn. */
	public next(): void {
		this.currentPlayerIndex = this.calculateIndex(this.currentPlayerIndex);
		const nextPlayerIndex = this.calculateIndex(this.currentPlayerIndex);
		this.notify({ nextPlayerIndex, currentPlayerIndex: this.currentPlayerIndex });
	}

	/**
	 * Calculates player index.
	 * @param currentIndex The index on the basis of which calculations are performed.
	 */
	private calculateIndex(currentIndex: number): number {
		const index = currentIndex + 1;
		if (this.playerCount === index) {
			return 0;
		}
		return index;
	}
}
