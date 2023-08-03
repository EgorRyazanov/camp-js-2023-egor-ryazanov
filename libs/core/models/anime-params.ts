import { Ordering } from '../mappers/ordering.mapper';

import { Rating } from './anime';
import { AnimeOrderingField } from './anime-ordering';
import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

/** Anime parameters. */
export interface AnimeParameters {

	/** Limit of elements in response. */
	readonly pageSize: number;

	/** Offset. */
	readonly pageNumber: number;

	/** Ordering. */
	readonly ordering?: Ordering<AnimeOrderingField>;

	/** Rating. */
	readonly rating?: Rating;

	/** Search. */
	readonly search?: string;

	/** Source. */
	readonly source?: string;

	/** Status. */
	readonly status?: AnimeStatus;

	/** English title. */
	readonly titleEnglish?: string;

	/** Japanese title. */
	readonly titleJapanese?: string;

	/** Type. */
	readonly type?: AnimeType;

	/** Type in. */
	readonly typeIn?: readonly AnimeType[];
}
