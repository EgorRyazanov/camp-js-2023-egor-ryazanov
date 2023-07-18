import { Status, Type, Rating } from '../utils/types';

import { Immerable, OmitImmerable } from './immerable';

export class AnimeParams extends Immerable {
	public readonly airedEndswithGte?: string;
	public readonly airedEndswithLte?: string;
	public readonly airedStartswithGte?: string;
	public readonly airedStartswithLte?: string;
	public readonly broadcastDay?: string;
	public readonly broadcastDayIn?: string;
	public readonly broadcastTimeGte?: string;
	public readonly broadcastTimeLte?: string;
	public readonly broadcastTimezoneIn?: string;
	public readonly limit?: number;
	public readonly offset?: number;
	public readonly ordering?: string;
	public readonly overallScoreAnnotatedGte?: string;
	public readonly overallScoreAnnotatedLte?: string;
	public readonly rating?: Rating;
	public readonly ratingIn?: Rating;
	public readonly search?: string;
	public readonly source?: string;
	public readonly sourceIn?: string;
	public readonly status?: Status;
	public readonly statusIn?: Status;
	public readonly titleEng?: string;
	public readonly titleEngIcontains?: string;
	public readonly titleJpnIn?: string;
	public readonly type?: Type;
	public readonly typeIn?: Type;
	public readonly userScoreAnnotatedGte?: number;
	public readonly userScoreAnnotatedLte?: number;

	public constructor(data: AnimeConstructorData) {
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
		this.titleEng = data.titleEng;
		this.titleEngIcontains = data.titleEngIcontains;
		this.titleJpnIn = data.titleJpnIn;
		this.type = data.type;
	}
}

type AnimeConstructorData = OmitImmerable<AnimeParams>;
