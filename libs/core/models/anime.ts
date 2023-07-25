import { Immerable, OmitImmerable } from './immerable';
import { Pagination } from './pagintation';

/** Anime. */
export class Anime extends Immerable {
	/** ID. */
	public readonly id: number;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	public readonly created: string;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	public readonly modified: string;

	/** English title. */
	public readonly titleEnglish: string;

	/** Japanese title. */
	public readonly titleJapanese: string;

	/** Image. */
	public readonly image: string;

	/** Aired dates. */
	public readonly aired: Aired;

	/** Type. */
	public readonly type: AnimeTypes;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Score. */
	public readonly score: number | null;

	/** User score. */
	public readonly userScore: number | null;

	public constructor(data: AnimeConstructorData) {
		super();
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
	}
}

/** Constructor of anime model. */
type AnimeConstructorData = OmitImmerable<Anime>;

/** Anime pagination. */
export type AnimePagination = Pagination<Anime>;

/** Anime type. */
export enum AnimeTypes {
	TV = 'TV',
	OVA = 'OVA',
	MOVIE = 'MOVIE',
	SPECIAL = 'SPECIAL',
	ONA = 'ONA',
	MUSIC = 'MUSIC',
	UNKNOWN = 'UNKNOWN',
}

/** Status. */
export enum AnimeStatus {
	FINISHED = 'FINISHED',
	AIRING = 'AIRING',
	NOT_YET_AIRED = 'NOT_YET_AIRED',
}

/** Rating. */
export enum Rating {
	G = 'G',
	PG = 'PG',
	PG_13 = 'PG_13',
	R_17 = 'R_17',
	R_PLUS = 'R_PLUS',
	R_X = 'R_X',
	UNKNOWN = 'UNKNOWN',
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

	/** Field name. */
	field: string;
}
