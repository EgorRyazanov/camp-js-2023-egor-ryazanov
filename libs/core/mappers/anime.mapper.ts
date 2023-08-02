import { AnimeDto, AnimeStatusDto, AnimeDtoTypes } from '../dtos/anime.dto';
import { Anime } from '../models/anime';
import { AnimeStatus } from '../models/anime-status';
import { AnimeTypes } from '../models/anime-type';

/** Anime Mapper. */
export namespace AnimeMapper {
	const ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeDtoTypes, AnimeTypes>> = {
		[AnimeDtoTypes.Music]: AnimeTypes.Music,
		[AnimeDtoTypes.Ova]: AnimeTypes.Ova,
		[AnimeDtoTypes.Ona]: AnimeTypes.Ona,
		[AnimeDtoTypes.Special]: AnimeTypes.Special,
		[AnimeDtoTypes.Tv]: AnimeTypes.Tv,
		[AnimeDtoTypes.Unknown]: AnimeTypes.Unknown,
		[AnimeDtoTypes.Movie]: AnimeTypes.Movie,
	};

	const ANIME_STATUS_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
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
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			image: dto.image,
			aired: dto.aired,
			type: ANIME_TYPE_FROM_DTO[dto.type],
			status: ANIME_STATUS_FROM_DTO[dto.status],
			score: dto.score,
			userScore: dto.user_score,
		});
	}
}
