/** Interface for combining generators and their potential subscribers. */
export interface Observer<T> {

	/**
	 * Updates entity by subscribe.
	 * @param value Changes that the user has subscribed to.
	 */
	update: (value: T) => void;
}

/** Total information about current turn. */
export interface RoundResult {

	/** Number of points on current turn. */
	readonly turnPoints: number;

	/** Index of player that made turn. */
	readonly currentPlayerIndex: number;

	/** Index of player that going to make turn in next round. */
	readonly nextPlayerIndex: number;
}

/** Player display information. */
export interface DisplayTurn {

	/** Win player status. */
	readonly isWin?: boolean;

	/** Status that means player will make turn in next round. */
	readonly isNext?: boolean;

	/** Sum of all points of player that made turn. */
	readonly pointsSum: number;

	/** Updated array of points of player that made turn. */
	readonly points: number[];
}

/** Information about the turn order of players in the game. */
export interface PlayerTurn {

	/** Index of player that made turn. */
	readonly currentPlayerIndex: number;

	/** Index of player that going to make turn in next round. */
	readonly nextPlayerIndex: number;
}
