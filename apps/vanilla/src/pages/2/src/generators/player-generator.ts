import { MAX_SCORE } from '../utils/consts';

import { RoundResult, DisplayTurn, Observer } from './types';
import { Publisher } from './publisher';

/** Player generator. */
export class PlayerGenerator extends Publisher<DisplayTurn> implements Observer<RoundResult> {
	/** Name of player. */
	public readonly name: string;

	/** Index for generating a sequence of player turns in the game. */
	private index: number;

	/** Game points of player. */
	public points: number[];

	/** The status of the player's victory. */
	private isWin: boolean;

	/** Sum of game points. */
	private pointsSum: number;

	public constructor(name: string, index: number) {
		super();
		this.name = name;
		this.index = index;
		this.points = [];
		this.isWin = false;
		this.pointsSum = 0;
	}

	/**
	 * Updates state of player and notify about changes.
	 * @param value Total information about current turn.
	 */
	public update(value: RoundResult): void {
		if (value.currentPlayerIndex === this.index) {
			this.points.push(value.turnPoints);
			this.pointsSum += value.turnPoints;
			if (this.pointsSum >= MAX_SCORE) {
				this.isWin = true;
			}
			this.notify({ isWin: this.isWin, pointsSum: this.pointsSum, points: this.points });
		}
		if (value.nextPlayerIndex === this.index) {
			this.notify({ isWin: this.isWin, isNext: true, pointsSum: this.pointsSum, points: this.points });
		}
	}
}
