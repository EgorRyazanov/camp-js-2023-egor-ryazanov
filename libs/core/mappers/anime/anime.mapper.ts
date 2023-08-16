import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../../../core/dtos/anime-dto/anime.dto';
import { Anime } from '../../../core/models/anime/anime';
import { AnimeStatus } from '../../../core/models/anime/anime-status';
import { AnimeType } from '../../../core/models/anime/anime-type';
import { AiredMapper } from '../aired.mapper';

/** Anime Mapper. */
export namespace AnimeMapper {
	export const ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
		[AnimeTypeDto.Music]: AnimeType.Music,
		[AnimeTypeDto.Ova]: AnimeType.Ova,
		[AnimeTypeDto.Ona]: AnimeType.Ona,
		[AnimeTypeDto.Special]: AnimeType.Special,
		[AnimeTypeDto.Tv]: AnimeType.Tv,
		[AnimeTypeDto.Unknown]: AnimeType.Unknown,
		[AnimeTypeDto.Movie]: AnimeType.Movie,
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
			imageUrl: dto.image,
			type: ANIME_TYPE_FROM_DTO[dto.type],
			status: ANIME_STATUS_FROM_DTO[dto.status],
			aired: AiredMapper.fromDto(dto.aired),
		});
	}
}
