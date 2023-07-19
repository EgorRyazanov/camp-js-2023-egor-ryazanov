import { Type, Status, Rating } from '../utils/types';

export interface AnimeParamsDto {
	aired__endswith__gte?: string;
	aired__endswith__lte?: string;
	aired__startswith__gte?: string;
	aired__startswith__lte?: string;
	broadcast_day?: string;
	broadcast_day__in?: string;
	broadcast_time__gte?: string;
	broadcast_time__lte?: string;
	broadcast_timezone__in?: string;
	limit?: number;
	offset?: number;
	ordering?: string;
	overall_score_annotated__gte?: string;
	overall_score_annotated__lte?: string;
	rating?: Rating;
	rating__in?: Rating;
	search?: string;
	source?: string;
	source__in?: string;
	status?: Status;
	status__in?: Status;
	title_eng?: string;
	title_eng__in?: string;
	title_eng__icontains?: string;
	title_jpn?: string;
	title_jpn__in?: string;
	title_jpn__icontains?: string;
	type?: Type;
	type__in?: Type;
	user_score_annotated__gte?: number;
	user_score_annotated__lte?: number;
}
