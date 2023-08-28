import { PaginationDto } from '../pagination.dto';

import { AiredDto } from '../aired-dto';

/** Anime DTO. */
export interface AnimeDto {

	/** ID. */
	readonly id: number;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image. */
	readonly image: string | null;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Aired dates. */
	readonly aired: AiredDto;
}

/** Anime DTO with pagination fields. */
export type AnimePaginationDto = PaginationDto<AnimeDto>;

/** Anime type DTO. */
export enum AnimeTypeDto {
	Tv = 'TV',
	Ova = 'OVA',
	Movie = 'MOVIE',
	Special = 'SPECIAL',
	Ona = 'ONA',
	Music = 'MUSIC',
	Unknown = 'UNKNOWN',
}

/** Status DTO. */
export enum AnimeStatusDto {
	Finished = 'FINISHED',
	Airing = 'AIRING',
	NotYetAired = 'NOT_YET_AIRED',
}
