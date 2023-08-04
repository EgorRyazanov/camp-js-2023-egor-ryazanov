import { AnimeParameters } from '../models/anime-params';
import { AnimeParametersDto } from '../dtos/anime-params.dto';
import { AnimeStatusDto, RatingDto } from '../dtos/anime.dto';
import { Rating } from '../models/anime';
import { deleteUndefinedProperties } from '../utils/delete-undefined-properties';
import { AnimeStatus } from '../models/anime-status';
import { AnimeOrderingField } from '../models/anime-ordering';
import { AnimeOrderingFieldDto } from '../dtos/anime-ordering.dto';

import { OrderingMapper } from './ordering.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

/** Anime Parameters Mapper. */
export namespace AnimeParametersMapper {
	const defaultPageSize = 25;

	const ORDERING_FIELD_TO_DTO = {
		[AnimeOrderingField.TitleEnghlish]: AnimeOrderingFieldDto.TitleEnghlish,
		[AnimeOrderingField.Status]: AnimeOrderingFieldDto.Status,
		[AnimeOrderingField.AiredStart]: AnimeOrderingFieldDto.AiredStart,
	};

	const ANIME_STATUS_TO_DTO: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
	};

	const ANIME_RATING_TO_DTO: Readonly<Record<Rating, RatingDto>> = {
		[Rating.G]: RatingDto.G,
		[Rating.PG]: RatingDto.PG,
		[Rating.PG_13]: RatingDto.PG_13,
		[Rating.R_17]: RatingDto.R_17,
		[Rating.R_PLUS]: RatingDto.R_PLUS,
		[Rating.R_X]: RatingDto.R_X,
		[Rating.Unknown]: RatingDto.Unknown,
	};

	/**
	 * Converts model to dto.
	 * @param model Anime model.
	 */
	export function toDto(model: AnimeParameters): AnimeParametersDto {
		return deleteUndefinedProperties({
			limit: model?.pageSize ?? defaultPageSize,
			offset: model?.pageNumber ? model.pageNumber * (model?.pageSize ?? defaultPageSize) : undefined,
			ordering: OrderingMapper.toDto(model?.ordering, ORDERING_FIELD_TO_DTO),
			rating: model?.rating ? ANIME_RATING_TO_DTO[model.rating] : undefined,
			search: model?.search,
			source: model?.source,
			status: model?.status ? ANIME_STATUS_TO_DTO[model.status] : undefined,
			title_eng: model?.titleEnglish,
			title_jpn: model?.titleJapanese,
			type: model?.type ? AnimeTypeMapper.ANIME_TYPE_TO_DTO[model.type] : undefined,
			type__in: model?.typeIn ? AnimeTypeMapper.toDto(model.typeIn) : undefined,
		});
	}
}