import { Ordering } from '../../../core/mappers/ordering.mapper';
import { DefaultParams } from '../default-params';

import { AnimeOrderingField } from './anime-ordering';
import { AnimeStatuses } from './anime-status';
import { AnimeType } from './anime-type';

/** Anime parameters. */
export interface AnimeParameters extends DefaultParams {
	/** Ordering. */
	readonly ordering?: Ordering<AnimeOrderingField>;

	/** Status. */
	readonly status?: AnimeStatuses;

	/** English title. */
	readonly titleEnglish?: string;

	/** Japanese title. */
	readonly titleJapanese?: string;

	/** Type in. */
	readonly typeIn?: readonly AnimeType[];
}
