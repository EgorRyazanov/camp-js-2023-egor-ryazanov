import { Ordering } from '../mappers/ordering.mapper';

import { Rating } from './anime';
import { AnimeOrderingDirection, AnimeOrderingField } from './anime-ordering';
import { AnimeStatus } from './anime-status';
import { AnimeTypes } from './anime-type';

/** Anime parameters. */
export class AnimeParameters {
	/** Limit of elements in response. */
	public readonly pageSize: number;

	/** Offset. */
	public readonly pageNumber: number;

	/** Ordering. */
	public readonly ordering?: Ordering<AnimeOrderingField, AnimeOrderingDirection>;

	/** Rating. */
	public readonly rating?: Rating;

	/** Search. */
	public readonly search?: string;

	/** Source. */
	public readonly source?: string;

	/** Status. */
	public readonly status?: AnimeStatus;

	/** English title. */
	public readonly titleEnglish?: string;

	/** Japanese title. */
	public readonly titleJapanese?: string;

	/** Type. */
	public readonly type?: AnimeTypes;

	/** Type in. */
	public readonly typeIn?: readonly AnimeTypes[];

	public constructor(data: AnimeParameters) {
		this.pageSize = data.pageSize;
		this.pageNumber = data.pageNumber;
		this.ordering = data.ordering;
		this.rating = data.rating;
		this.search = data.search;
		this.source = data.source;
		this.status = data.status;
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.typeIn = data.typeIn;
		this.type = data.type;
	}
}
