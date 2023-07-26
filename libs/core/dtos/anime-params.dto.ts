import { AnimeDtoTypes, AnimeStatusDto, RatingDto } from './anime.dto';

/** Anime parameters DTO. */
export interface AnimeParametersDto {
	/** Limit of elements in response. */
	readonly limit?: number;

	/** Offset. */
	readonly offset?: number;

	/** Ordering. */
	readonly ordering?: string;
	/** Rating. */
	readonly rating?: RatingDto;

	/** Rating in. */
	readonly rating__in?: RatingDto;

	/** Search. */
	readonly search?: string;

	/** Source. */
	readonly source?: string;

	/** Status. */
	readonly status?: AnimeStatusDto;
	/** English title. */
	readonly title_eng?: string;

	/** Japanese title. */
	readonly title_jpn?: string;
	/** Type. */
	readonly type?: AnimeDtoTypes;

	/** Type. */
	readonly type__in?: AnimeDtoTypes;
}
