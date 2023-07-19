import { Type, Status, Rating } from '../utils/types';

/** Anime parameters DTO */
export interface AnimeParametersDto {
	/** Greater end date then current. */
	aired__endswith__gte?: string;
	/** Less end date then current date. */
	aired__endswith__lte?: string;
	/** Greater start date then current. */
	aired__startswith__gte?: string;
	/** Less start date then current. */
	aired__startswith__lte?: string;
	/** Broadcast day. */
	broadcast_day?: string;
	/** Broadcast day in. */
	broadcast_day__in?: string;
	/** Greater broadcast time then current. */
	broadcast_time__gte?: string;
	/** Less broadcast time then current. */
	broadcast_time__lte?: string;
	/** Broadcast timezone. */
	broadcast_timezone__in?: string;
	/** Limit of elements in response. */
	limit?: number;
	/** Offset. */
	offset?: number;
	/** Ordering. */
	ordering?: string;
	/** Greater overall annotated score then current. */
	overall_score_annotated__gte?: string;
	/** Less overall annotated score then current. */
	overall_score_annotated__lte?: string;
	/** Rating. */
	rating?: Rating;
	/** Rating in. */
	rating__in?: Rating;
	/** Search. */
	search?: string;
	/** Source. */
	source?: string;
	/** Source in. */
	source__in?: string;
	/** Status. */
	status?: Status;
	/** Status in. */
	status__in?: Status;
	/** English title. */
	title_eng?: string;
	/** English title in. */
	title_eng__in?: string;
	/** English title contains. */
	title_eng__icontains?: string;
	/** Japanese title. */
	title_jpn?: string;
	/** Japanese title in. */
	title_jpn__in?: string;
	/** Japanese title contains. */
	title_jpn__icontains?: string;
	/** Type. */
	type?: Type;
	/** Type in. */
	type__in?: Type;
	/** Greater annotated user score then current. */
	user_score_annotated__gte?: number;
	/** Less annotated user score then current. */
	user_score_annotated__lte?: number;
}
