import { AnimeStatus, AnimeTypes, Rating, Ordering } from './anime';

import { Immerable, OmitImmerable } from './immerable';

/** Anime parameters. */
export class AnimeParameters extends Immerable {
	/** Limit of elements in response. */
	public readonly pageSize?: number;

	/** Offset. */
	public readonly pageNumber?: number;

	/** Ordering. */
	public readonly ordering?: Ordering;

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
	public readonly typeIn?: AnimeTypes[];

	public constructor(data: AnimeParametersConstructorData) {
		super();
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

/** Constructor of anime parameters model. */
type AnimeParametersConstructorData = OmitImmerable<AnimeParameters>;
