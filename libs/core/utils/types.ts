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
	/** Start date. */
	start: string | null;

	/** End date. */
	end: string | null;
}
