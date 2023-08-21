import { AnimeStatusDto } from './anime.dto';

/** Anime parameters DTO. */
export interface AnimeParametersDto {

	/** Limit of elements in response. */
	readonly limit?: number;

	/** Offset. */
	readonly offset?: number;

	/** Ordering. */
	readonly ordering?: string;

	/** Search. */
	readonly search?: string;

	/** Status. */
	readonly status?: AnimeStatusDto;

	/** Type in. */
	readonly type__in?: string;
}
