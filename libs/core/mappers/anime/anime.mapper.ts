import { AnimeDto, AnimeStatusDto, AnimeDtoTypes } from '../../../core/dtos/anime-dto/anime.dto';
import { Anime } from '../../../core/models/anime/anime';
import { AnimeStatus } from '../../../core/models/anime/anime-status';
import { AnimeTypes } from '../../../core/models/anime/anime-type';

/** Anime Mapper. */
export namespace AnimeMapper {
	export const ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeDtoTypes, AnimeTypes>> = {
		[AnimeDtoTypes.Music]: AnimeTypes.Music,
		[AnimeDtoTypes.Ova]: AnimeTypes.Ova,
		[AnimeDtoTypes.Ona]: AnimeTypes.Ona,
		[AnimeDtoTypes.Special]: AnimeTypes.Special,
		[AnimeDtoTypes.Tv]: AnimeTypes.Tv,
		[AnimeDtoTypes.Unknown]: AnimeTypes.Unknown,
		[AnimeDtoTypes.Movie]: AnimeTypes.Movie,
	};

	export const ANIME_STATUS_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
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
