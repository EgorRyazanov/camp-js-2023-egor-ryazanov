import { Status, Type, Rating } from '../utils/types';

import { Immerable, OmitImmerable } from './immerable';

/** Anime parameters. */
export class AnimeParameters extends Immerable {
	/** Greater end date then current. */
	public readonly airedEndswithGte?: string;
	/** Less end date then current date. */
	public readonly airedEndswithLte?: string;
	/** Greater start date then current. */
	public readonly airedStartswithGte?: string;
	/** Less start date then current. */
	public readonly airedStartswithLte?: string;
	/** Broadcast day. */
	public readonly broadcastDay?: string;
	/** Broadcast day in. */
	public readonly broadcastDayIn?: string;
	/** Greater broadcast time then current. */
	public readonly broadcastTimeGte?: string;
	/** Less broadcast time then current. */
	public readonly broadcastTimeLte?: string;
	/** Broadcast timezone. */
	public readonly broadcastTimezoneIn?: string;
	/** Limit of elements in response. */
	public readonly limit?: number;
	/** Offset. */
	public readonly offset?: number;
	/** Ordering. */
	public readonly ordering?: string;
	/** Greater overall annotated score then current. */
	public readonly overallScoreAnnotatedGte?: string;
	/** Less overall annotated score then current. */
	public readonly overallScoreAnnotatedLte?: string;
	/** Rating. */
	public readonly rating?: Rating;
	/** Rating in. */
	public readonly ratingIn?: Rating;
	/** Search. */
	public readonly search?: string;
	/** Source. */
	public readonly source?: string;
	/** Source in. */
	public readonly sourceIn?: string;
	/** Status. */
	public readonly status?: Status;
	/** Status in. */
	public readonly statusIn?: Status;
	/** English title. */
	public readonly titleEnglish?: string;
	/** English title in. */
	public readonly titleEngIn?: string;
	/** English title contains. */
	public readonly titleEnglishIcontains?: string;
	/** Japanese title in. */
	public readonly titleJapaneseIn?: string;
	/** Japanese title. */
	public readonly titleJapanese?: string;
	/** Japanese title contains. */
	public readonly titleJapaneseIcontains?: string;
	/** Type. */
	public readonly type?: Type;
	/** Type in. */
	public readonly typeIn?: Type;
	/** Greater annotated user score then current. */
	public readonly userScoreAnnotatedGte?: number;
	/** Less annotated user score then current. */
	public readonly userScoreAnnotatedLte?: number;

	public constructor(data: AnimeParametersConstructorData) {
		super();
		this.airedEndswithGte = data.airedEndswithGte;
		this.airedEndswithLte = data.airedEndswithLte;
		this.airedStartswithGte = data.airedStartswithGte;
		this.airedStartswithLte = data.airedStartswithLte;
		this.broadcastDay = data.broadcastDay;
		this.broadcastDayIn = data.broadcastDayIn;
		this.broadcastTimeGte = data.broadcastTimeGte;
		this.broadcastTimeLte = data.broadcastTimeLte;
		this.broadcastTimezoneIn = data.broadcastTimezoneIn;
		this.limit = data.limit;
		this.offset = data.offset;
		this.ordering = data.ordering;
		this.overallScoreAnnotatedGte = data.overallScoreAnnotatedGte;
		this.overallScoreAnnotatedLte = data.overallScoreAnnotatedLte;
		this.rating = data.rating;
		this.ratingIn = data.ratingIn;
		this.search = data.search;
		this.source = data.source;
		this.sourceIn = data.sourceIn;
		this.status = data.status;
		this.statusIn = data.statusIn;
		this.titleEnglish = data.titleEnglish;
		this.titleEnglishIcontains = data.titleEnglishIcontains;
		this.titleEngIn = data.titleEngIn;
		this.titleJapaneseIn = data.titleJapaneseIn;
		this.titleJapanese = data.titleJapanese;
		this.titleJapaneseIcontains = data.titleJapaneseIcontains;
		this.type = data.type;
	}
}

/** Constructor of anime parameters model. */
type AnimeParametersConstructorData = OmitImmerable<AnimeParameters>;
