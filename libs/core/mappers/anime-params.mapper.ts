import { AnimeParameters } from '../models/anime-params';
import { AnimeParametersDto } from '../dtos/anime-params.dto';

/** Anime Parameters Mapper. */
export namespace AnimeParametersMapper {
	/**
	 * Converts model to dto.
	 * @param model anime model.
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
			ordering: model?.ordering,
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
			title_eng__in: model?.titleEngIn,
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
