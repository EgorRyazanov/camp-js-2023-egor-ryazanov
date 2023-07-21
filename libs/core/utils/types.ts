/** Type. */
export enum Type {
	'TV',
	'OVA',
	'MOVIE',
	'SPECIAL',
	'ONA',
	'MUSIC',
	'UNKNOWN',
}

/** Status. */
export enum Status {
	'FINISHED',
	'AIRING',
	'NOT_YET_AIRED',
}

/** Rating. */
export enum Rating {
	'G',
	'PG',
	'PG_13',
	'R_17',
	'R_PLUS',
	'R_X',
	'UNKNOWN',
}

/** Aired dates. */
export interface Aired {
	/**
	 *  Start date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	start: string | null;

	/**
	 *  End date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	end: string | null;
}

/** Ordering. */
export interface Ordering {
	/**
	 * Ordering direction.
	 * @example "asc", "desc", "none".
	 */
	direction: string;
	/** field name. */
	field: string;
}
