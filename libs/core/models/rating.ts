/** Rating. */
export enum Ratings {
	G = 'G',
	PG = 'PG',
	PG_13 = 'PG_13',
	R_17 = 'R_17',
	R_PLUS = 'R_PLUS',
	R_X = 'R_X',
	Unknown = 'UNKNOWN',
}

/** Rating. */
export namespace Rating {
	const TO_TITLE_MAP: Record<Ratings, string> = {
		[Ratings.G]: 'G',
		[Ratings.PG]: 'PG',
		[Ratings.PG_13]: 'PG-17',
		[Ratings.R_17]: 'R-17',
		[Ratings.R_PLUS]: 'R-PLUS',
		[Ratings.R_X]: 'R-X',
		[Ratings.Unknown]: 'Unknown',
	};

	/**
	 * Makes rating readable.
	 * @param rating Rating.
	 */
	export function toReadable(rating: Ratings): string {
		return TO_TITLE_MAP[rating];
	}
}
