import { MAX_SCORE } from '../utils/consts';

import { RoundResult, DisplayTurn, Observer } from './types';
import { Publisher } from './publisher';

/** Player generator. */
export class PlayerGenerator extends Publisher<DisplayTurn> implements Observer<RoundResult> {
	/** Name of player. */
	public readonly name: string;

	/** Game points of player. */
	public readonly points: number[];

	/** The status of the player's victory. */
	private isWin: boolean;

	/** Sum of game points. */
	private pointsSum: number;

	/** Index for generating a sequence of player turns in the game. */
	private readonly sequenceIndex: number;

	public constructor(name: string, sequenceIndex: number) {
		super();
		this.name = name;
		this.sequenceIndex = sequenceIndex;
		this.points = [];
		this.isWin = false;
		this.pointsSum = 0;
	}

	/**
	 * Updates state of player and notify about changes.
	 * @param value Total information about current turn.
	 */
	public update(value: RoundResult): void {
		if (value.currentPlayerIndex === this.sequenceIndex) {
			this.points.push(value.turnPoints);
			this.pointsSum += value.turnPoints;
			if (this.pointsSum >= MAX_SCORE) {
				this.isWin = true;
			}
			this.notify({ isWin: this.isWin, pointsSum: this.pointsSum, points: this.points });
		}
		if (value.nextPlayerIndex === this.sequenceIndex) {
			this.notify({ isWin: this.isWin, isNext: true, pointsSum: this.pointsSum, points: this.points });
		}
	}
}
