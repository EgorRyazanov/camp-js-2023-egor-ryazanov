import { Ordering } from '../../../core/mappers/ordering.mapper';

import { AnimeOrderingField } from './anime-ordering';
import { AnimeStatus } from './anime-status';
import { AnimeTypes } from './anime-type';

/** Anime parameters. */
export class AnimeParameters {
	/** Limit of elements in response. */
	public readonly pageSize: number;

	/** Offset. */
	public readonly pageNumber: number;

	/** Ordering. */
	public readonly ordering?: Ordering<AnimeOrderingField>;

	/** Search. */
	public readonly search?: string;

	/** Status. */
	public readonly status?: AnimeStatus;

	/** Type in. */
	public readonly typeIn?: readonly AnimeTypes[];

	public constructor(data: AnimeParameters) {
		this.pageSize = data.pageSize;
		this.pageNumber = data.pageNumber;
		this.ordering = data.ordering;
		this.search = data.search;
		this.status = data.status;
		this.typeIn = data.typeIn;
	}
}
