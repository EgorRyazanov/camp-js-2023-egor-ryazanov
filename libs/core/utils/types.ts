export enum Type {
	'TV',
	'OVA',
	'MOVIE',
	'SPECIAL',
	'ONA',
	'MUSIC',
	'UNKNOWN',
}

export enum Status {
	'FINISHED',
	'AIRING',
	'NOT_YET_AIRED',
}

export enum Rating {
	'G',
	'PG',
	'PG_13',
	'R_17',
	'R_PLUS',
	'R_X',
	'UNKNOWN',
}

export type Aired = {
	start: string | null;
	end: string | null;
};
