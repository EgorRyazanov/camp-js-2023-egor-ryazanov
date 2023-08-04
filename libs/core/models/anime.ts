import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';
import { Pagination } from './pagintation';

/** Anime. */
export class Anime {
	/** ID. */
	public readonly id: number;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	public readonly created: Date;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	public readonly modified: Date;

	/** English title. */
	public readonly titleEnglish: string;

	/** Japanese title. */
	public readonly titleJapanese: string;

	/** Image. */
	public readonly image: string;

	/** Aired dates. */
	public readonly aired: Aired;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Score. */
	public readonly score: number | null;

	/** User score. */
	public readonly userScore: number | null;

	public constructor(data: Anime) {
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

/** Anime pagination. */
export type AnimePagination = Pagination<Anime>;

/** Rating. */
export enum Rating {
	G = 'G',
	PG = 'PG',
	PG_13 = 'PG_13',
	R_17 = 'R_17',
	R_PLUS = 'R_PLUS',
	R_X = 'R_X',
	Unknown = 'UNKNOWN',
}

/** Aired dates. */
export interface Aired {

	/**
	 *  Start date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	start: Date | null;

	/**
	 *  End date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	end: Date | null;
}