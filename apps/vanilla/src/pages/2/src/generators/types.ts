/** Interface for combining generators and their potential subscribers. */
export interface Observer<T> {

	/**
	 * Updates entity by subscribe.
	 * @param value Changes that the user has subscribed to.
	 */
	update: (value: T) => void;
}

/** Interface of total information about current turn. */
export interface RoundResult {

	/** Number of points on current turn.  */
	turnPoints: number;

	/** Index of player that made turn. */
	currentPlayerIndex: number;

	/** Index of player that going to make turn in next round. */
	nextPlayerIndex: number;
}

/** Interface of player display information. */
export interface DisplayTurn {

	/** Win player status. */
	isWin?: boolean;

	/** Status that means player will make turn in next round. */
	isNext?: boolean;

	/** Sum of all points of player that made turn.  */
	pointsSum: number;

	/** Updated array of points of player that made turn. */
	points: number[];
}

/** Interface of information about the turn order of players in the game. */
export interface PlayerTurn {

	/** Index of player that made turn. */
	currentPlayerIndex: number;

	/** Index of player that going to make turn in next round. */
	nextPlayerIndex: number;
}
