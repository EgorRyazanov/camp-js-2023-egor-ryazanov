import { Publisher } from './publisher';
import { PlayerTurn } from './types';

/** Turn generator. */
export class TurnGenerator extends Publisher<PlayerTurn> {
	/** Index of player that made turn. */
	private currentPlayerIndex: number;

	/** Total players count. */
	public readonly playersCount: number;

	public constructor(playerCount: number) {
		super();
		this.playersCount = playerCount;
		this.currentPlayerIndex = -1;
	}

	/** Makes turn. */
	public getNextTurn(): void {
		this.currentPlayerIndex = this.calculateIndex();
		const nextPlayerIndex = this.calculateIndex();
		this.notify({ nextPlayerIndex, currentPlayerIndex: this.currentPlayerIndex });
	}

	/** Calculates player index. */
	private calculateIndex(): number {
		const index = this.currentPlayerIndex + 1;
		if (this.playersCount === index) {
			return 0;
		}
		return index;
	}
}
