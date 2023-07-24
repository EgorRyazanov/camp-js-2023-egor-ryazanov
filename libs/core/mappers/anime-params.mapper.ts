import { AnimeParameters } from '../models/anime-params';
import { AnimeParametersDto } from '../dtos/anime-params.dto';
import { OrderingMapper } from './ordering.mapper';
import { AnimeDtoTypes, AnimeStatusDto, RatingDto } from '../dtos/anime.dto';
import { AnimeTypes, AnimeStatus, Rating } from '../models/anime';

/** Anime Parameters Mapper. */
export namespace AnimeParametersMapper {
	/**
	 * Converts model to dto.
	 * @param model Anime model.
	 */
	export function toDto(model: AnimeParameters): AnimeParametersDto {
		return {
			limit: model?.limit,
			offset: model?.offset,
			ordering: OrderingMapper.toDto(model?.ordering, orderingToDto),
			rating: model?.rating,
			limit: model?.pageSize ? model.pageSize : defaultPageSize,
			offset: model?.pageNumber ? model.pageNumber : undefined,
			ordering: model?.ordering,
			rating: model?.rating ? ANIME_RATING_TO_DTO[model.rating] : undefined,
			search: model?.search,
			source: model?.source,
			status: model?.status ? ANIME_STATUS_TO_DTO[model.status] : undefined,
			title_eng: model?.titleEnglish,
			title_jpn: model?.titleJapanese,
			type: model?.type ? ANIME_TYPE_TO_DTO[model.type] : undefined,
			type__in: model?.typeIn ? ANIME_TYPE_TO_DTO[model.typeIn] : undefined,
		};
	}
}
