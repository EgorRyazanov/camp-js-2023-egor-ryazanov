import { Aired } from '../../../core/models/anime/anime';

import { PaginationDto } from '../pagination.dto';

/** Anime DTO. */
export interface AnimeDto {

	/** ID. */
	readonly id: number;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	readonly created: string;

	/**
	 * Modified date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	readonly modified: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image. */
	readonly image: string;

	/** Aired dates. */
	readonly aired: Aired;

	/** Type. */
	readonly type: AnimeDtoTypes;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Score. */
	readonly score: number | null;

	/** User score. */
	readonly user_score: number | null;
}

/** Anime DTO with pagination fields. */
export type AnimePaginationDto = PaginationDto<AnimeDto>;

/** Anime type. */
export enum AnimeDtoTypes {
	Tv = 'TV',
	Ova = 'OVA',
	Movie = 'MOVIE',
	Special = 'SPECIAL',
	Ona = 'ONA',
	Music = 'MUSIC',
	Unknown = 'UNKNOWN',
}

/** Status. */
export enum AnimeStatusDto {
	Finished = 'FINISHED',
	Airing = 'AIRING',
	NotYetAired = 'NOT_YET_AIRED',
}

/** Rating. */
export enum RatingDto {
	G = 'G',
	PG = 'PG',
	PG_13 = 'PG_13',
	R_17 = 'R_17',
	R_PLUS = 'R_PLUS',
	R_X = 'R_X',
	Unknown = 'UNKNOWN',
}
