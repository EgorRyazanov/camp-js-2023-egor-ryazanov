import { AnimeDto, AnimeStatusDto, AnimeDtoTypes } from '../../../core/dtos/anime-dto/anime.dto';
import { Anime } from '../../../core/models/anime/anime';
import { AnimeStatuses } from '../../../core/models/anime/anime-status';
import { AnimeType } from '../../../core/models/anime/anime-type';

/** Anime Mapper. */
export namespace AnimeMapper {
	export const ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeDtoTypes, AnimeType>> = {
		[AnimeDtoTypes.Music]: AnimeType.Music,
		[AnimeDtoTypes.Ova]: AnimeType.Ova,
		[AnimeDtoTypes.Ona]: AnimeType.Ona,
		[AnimeDtoTypes.Special]: AnimeType.Special,
		[AnimeDtoTypes.Tv]: AnimeType.Tv,
		[AnimeDtoTypes.Unknown]: AnimeType.Unknown,
		[AnimeDtoTypes.Movie]: AnimeType.Movie,
	};

	export const ANIME_STATUS_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatuses>> = {
		[AnimeStatusDto.Finished]: AnimeStatuses.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatuses.NotYetAired,
		[AnimeStatusDto.Airing]: AnimeStatuses.Airing,
	};

	/**
	 * Converts anime DTO to anime model.
	 * @param dto Anime DTO.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			image: dto.image,
			type: ANIME_TYPE_FROM_DTO[dto.type],
			status: ANIME_STATUS_FROM_DTO[dto.status],
			aired: {
				start: new Date(dto.aired.start ?? ''),
				end: new Date(dto.aired.end ?? ''),
			},
		});
	}
}
