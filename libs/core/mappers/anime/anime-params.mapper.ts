import { AnimeParameters } from '../../models/anime/anime-params';
import { AnimeParametersDto } from '../../dtos/anime-dto/anime-params.dto';
import { AnimeDtoTypes, AnimeStatusDto, RatingDto } from '../../dtos/anime-dto/anime.dto';
import { AnimeTypes, AnimeStatus, Rating } from '../../models/anime/anime';

import { OrderingMapper } from '../ordering.mapper';

/** Anime Parameters Mapper. */
export namespace AnimeParametersMapper {
	const defaultPageSize = 25;

	const orderingToDto = {
		titleEnglish: 'title_eng',
		status: 'status',
		[`aired.start`]: 'aired__startswith',
	};

	const ANIME_TYPE_TO_DTO: Readonly<Record<AnimeTypes, AnimeDtoTypes>> = {
		[AnimeTypes.MUSIC]: AnimeDtoTypes.MUSIC,
		[AnimeTypes.OVA]: AnimeDtoTypes.OVA,
		[AnimeTypes.ONA]: AnimeDtoTypes.ONA,
		[AnimeTypes.SPECIAL]: AnimeDtoTypes.SPECIAL,
		[AnimeTypes.TV]: AnimeDtoTypes.TV,
		[AnimeTypes.UNKNOWN]: AnimeDtoTypes.UNKNOWN,
		[AnimeTypes.MOVIE]: AnimeDtoTypes.MOVIE,
	};

	const ANIME_STATUS_TO_DTO: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
		[AnimeStatus.FINISHED]: AnimeStatusDto.FINISHED,
		[AnimeStatus.NOT_YET_AIRED]: AnimeStatusDto.NOT_YET_AIRED,
		[AnimeStatus.AIRING]: AnimeStatusDto.AIRING,
	};

	const ANIME_RATING_TO_DTO: Readonly<Record<Rating, RatingDto>> = {
		[Rating.G]: RatingDto.G,
		[Rating.PG]: RatingDto.PG,
		[Rating.PG_13]: RatingDto.PG_13,
		[Rating.R_17]: RatingDto.R_17,
		[Rating.R_PLUS]: RatingDto.R_PLUS,
		[Rating.R_X]: RatingDto.R_X,
		[Rating.UNKNOWN]: RatingDto.UNKNOWN,
	};

	/**
	 * Converts model to dto.
	 * @param model Anime model.
	 */
	export function toDto(model: AnimeParameters): AnimeParametersDto {
		return {
			limit: model?.pageSize ?? defaultPageSize,
			offset: model?.pageNumber ? model.pageNumber * (model?.pageSize ?? defaultPageSize) : undefined,
			ordering: OrderingMapper.toDto(model?.ordering, orderingToDto),
			rating: model?.rating ? ANIME_RATING_TO_DTO[model.rating] : undefined,
			search: model?.search,
			source: model?.source,
			status: model?.status ? ANIME_STATUS_TO_DTO[model.status] : undefined,
			title_eng: model?.titleEnglish,
			title_jpn: model?.titleJapanese,
			type: model?.type ? ANIME_TYPE_TO_DTO[model.type] : undefined,
			type__in: model?.typeIn ? model.typeIn.map((typeInElement) => ANIME_TYPE_TO_DTO[typeInElement]) : undefined,
		};
	}
}
