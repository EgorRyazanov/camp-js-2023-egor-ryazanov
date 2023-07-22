import { AnimeParameters } from '../models/anime-params';
import { AnimeParametersDto } from '../dtos/anime-params.dto';
import { OrderingMapper } from './ordering.mapper';

/** Anime Parameters Mapper. */
export namespace AnimeParametersMapper {
	const orderingToDto = {
		titleEnglish: 'title_eng',
		status: 'status',
		[`aired.start`]: 'aired__startswith',
	};

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
			search: model?.search,
			source: model?.source,
			status: model?.status,
			title_eng: model?.titleEnglish,
			title_jpn: model?.titleJapanese,
			type: model?.type,
			type__in: model?.typeIn?.toString(),
		};
	}
}
