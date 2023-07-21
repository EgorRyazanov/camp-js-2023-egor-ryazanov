import { Status, Type, Rating, Ordering } from '../utils/types';

import { Immerable, OmitImmerable } from './immerable';

/** Anime parameters. */
export class AnimeParameters extends Immerable {
	/** Limit of elements in response. */
	public readonly limit?: number;

	/** Offset. */
	public readonly offset?: number;

	/** Ordering. */
	public readonly ordering?: Ordering;

	/** Rating. */
	public readonly rating?: Rating;

	/** Search. */
	public readonly search?: string;

	/** Source. */
	public readonly source?: string;

	/** Status. */
	public readonly status?: Status;

	/** English title. */
	public readonly titleEnglish?: string;

	/** Japanese title. */
	public readonly titleJapanese?: string;

	/** Type. */
	public readonly type?: Type;

	public constructor(data: AnimeParametersConstructorData) {
		super();
		this.limit = data.limit;
		this.offset = data.offset;
		this.ordering = data.ordering;
		this.rating = data.rating;
		this.search = data.search;
		this.source = data.source;
		this.status = data.status;
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.type = data.type;
	}
}

/** Constructor of anime parameters model. */
type AnimeParametersConstructorData = OmitImmerable<AnimeParameters>;
