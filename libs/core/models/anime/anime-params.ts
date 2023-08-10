import { Ordering } from '../../../core/mappers/ordering.mapper';

import { AnimeOrderingField } from './anime-ordering';
import { AnimeStatuses } from './anime-status';
import { AnimeType } from './anime-type';

/** Anime parameters. */
export interface AnimeParameters {
	/** Limit of elements in response. */
	readonly pageSize: number;

	/** Offset. */
	readonly pageNumber: number;

	/** Ordering. */
	readonly ordering?: Ordering<AnimeOrderingField>;

	/** Search. */
	readonly search?: string;

	/** Status. */
	readonly status?: AnimeStatuses;

	/** English title. */
	readonly titleEnglish?: string;

	/** Japanese title. */
	readonly titleJapanese?: string;

	/** Type in. */
	readonly typeIn?: readonly AnimeType[];
}
