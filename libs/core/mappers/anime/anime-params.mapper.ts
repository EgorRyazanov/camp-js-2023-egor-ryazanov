import { AnimeParameters } from '../../../core/models/anime/anime-params';
import { AnimeParametersDto } from '../../../core/dtos/anime-dto/anime-params.dto';
import { AnimeStatusDto } from '../../../core/dtos/anime-dto/anime.dto';
import { deleteUndefinedProperties } from '../../../core/utils/delete-undefined-properties';
import { AnimeStatuses } from '../../../core/models/anime/anime-status';
import { AnimeOrderingField } from '../../../core/models/anime/anime-ordering';
import { AnimeOrderingFieldDto } from '../../../core/dtos/anime-dto/anime-ordering.dto';

import { OrderingMapper } from '../ordering.mapper';

import { AnimeTypeMapper } from './anime-type.mapper';

/** Anime Parameters Mapper. */
export namespace AnimeParametersMapper {
	const defaultPageSize = 25;

	const ORDERING_FIELD_TO_DTO = {
		[AnimeOrderingField.TitleEnghlish]: AnimeOrderingFieldDto.TitleEnghlish,
		[AnimeOrderingField.Status]: AnimeOrderingFieldDto.Status,
		[AnimeOrderingField.AiredStart]: AnimeOrderingFieldDto.AiredStart,
	};

	const ANIME_STATUS_TO_DTO: Readonly<Record<AnimeStatuses, AnimeStatusDto>> = {
		[AnimeStatuses.Finished]: AnimeStatusDto.Finished,
		[AnimeStatuses.NotYetAired]: AnimeStatusDto.NotYetAired,
		[AnimeStatuses.Airing]: AnimeStatusDto.Airing,
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
			search: model?.search,
			status: model?.status ? ANIME_STATUS_TO_DTO[model.status] : undefined,
			type__in: model?.typeIn ? AnimeTypeMapper.toDto(model.typeIn) : undefined,
		});
	}
}
