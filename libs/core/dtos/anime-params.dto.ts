import { Type, Status, Rating } from '../utils/types';

/** Anime parameters DTO. */
export interface AnimeParametersDto {

	/** Greater end date then current. */
	readonly aired__endswith__gte?: string;

	/** Less end date then current date. */
	readonly aired__endswith__lte?: string;

	/** Greater start date then current. */
	readonly aired__startswith__gte?: string;

	/** Less start date then current. */
	readonly aired__startswith__lte?: string;

	/** Broadcast day. */
	readonly broadcast_day?: string;

	/** Broadcast day in. */
	readonly broadcast_day__in?: string;

	/** Greater broadcast time then current. */
	readonly broadcast_time__gte?: string;

	/** Less broadcast time then current. */
	readonly broadcast_time__lte?: string;

	/** Broadcast timezone. */
	readonly broadcast_timezone__in?: string;

	/** Limit of elements in response. */
	readonly limit?: number;

	/** Offset. */
	readonly offset?: number;

	/** Ordering. */
	readonly ordering?: string;

	/** Greater overall annotated score then current. */
	readonly overall_score_annotated__gte?: string;

	/** Less overall annotated score then current. */
	readonly overall_score_annotated__lte?: string;

	/** Rating. */
	readonly rating?: Rating;

	/** Rating in. */
	readonly rating__in?: Rating;

	/** Search. */
	readonly search?: string;

	/** Source. */
	readonly source?: string;

	/** Source in. */
	readonly source__in?: string;

	/** Status. */
	readonly status?: Status;

	/** Status in. */
	readonly status__in?: Status;

	/** English title. */
	readonly title_eng?: string;

	/** English title in. */
	readonly title_eng__in?: string;

	/** English title contains. */
	readonly title_eng__icontains?: string;

	/** Japanese title. */
	readonly title_jpn?: string;

	/** Japanese title in. */
	readonly title_jpn__in?: string;

	/** Japanese title contains. */
	readonly title_jpn__icontains?: string;

	/** Type. */
	readonly type?: Type;

	/** Type in. */
	readonly type__in?: Type;

	/** Greater annotated user score then current. */
	readonly user_score_annotated__gte?: number;

	/** Less annotated user score then current. */
	readonly user_score_annotated__lte?: number;
}
