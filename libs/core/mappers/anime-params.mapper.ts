import { AnimeParameters } from '../models/anime-params';
import { AnimeParametersDto } from '../dtos/anime-params.dto';
import { TOrdering } from '../utils/types';

/** Anime Parameters Mapper. */
export namespace AnimeParametersMapper {
	/**
	 * Converts ordering model value to dto ordering value.
	 * @param value of ordering model.
	 */
	function orderingToDto(value: TOrdering): string | undefined {
		switch (value.field) {
			case 'titleEnglish':
				return value.direction === 'asc' ? '-title_eng' : 'title_eng';
			case 'status':
				return value.direction === 'asc' ? '-status' : 'status';
			case 'aired.start':
				return value.direction === 'asc' ? '-aired__startswith' : 'aired__startswith';
			default:
				return undefined;
		}
	}

	/**
	 * Converts model to dto.
	 * @param model Anime model.
	 */
	export function toDto(model: AnimeParameters): AnimeParametersDto {
		return {
			aired__endswith__gte: model?.airedEndswithGte,
			aired__endswith__lte: model?.airedEndswithLte,
			aired__startswith__gte: model?.airedStartswithGte,
			aired__startswith__lte: model?.airedStartswithLte,
			broadcast_day: model?.broadcastDay,
			broadcast_day__in: model?.broadcastDayIn,
			broadcast_time__gte: model?.broadcastTimeGte,
			broadcast_time__lte: model?.broadcastTimeLte,
			broadcast_timezone__in: model?.broadcastTimezoneIn,
			limit: model?.limit,
			offset: model?.offset,
			ordering: model?.ordering ? orderingToDto(model.ordering) : undefined,
			overall_score_annotated__gte: model?.overallScoreAnnotatedGte,
			overall_score_annotated__lte: model?.overallScoreAnnotatedLte,
			rating: model?.rating,
			rating__in: model?.ratingIn,
			search: model?.search,
			source: model?.source,
			source__in: model?.sourceIn,
			status: model?.status,
			status__in: model?.statusIn,
			title_eng: model?.titleEnglish,
			title_eng__in: model?.titleEnglishIn,
			title_eng__icontains: model?.titleEnglishIcontains,
			title_jpn__in: model?.titleJapaneseIn,
			title_jpn: model?.titleJapanese,
			title_jpn__icontains: model?.titleJapaneseIcontains,
			type: model?.type,
			type__in: model?.typeIn,
			user_score_annotated__gte: model?.userScoreAnnotatedGte,
			user_score_annotated__lte: model?.userScoreAnnotatedLte,
		};
	}
}
