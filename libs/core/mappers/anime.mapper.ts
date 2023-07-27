import { AnimeDto, AnimeStatusDto, AnimeDtoTypes } from '../dtos/anime.dto';
import { Anime, AnimeTypes } from '../models/anime';
import { AnimeStatus } from '../models/anime-status';

/** Anime Mapper. */
export namespace AnimeMapper {
	const ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeDtoTypes, AnimeTypes>> = {
		[AnimeDtoTypes.MUSIC]: AnimeTypes.MUSIC,
		[AnimeDtoTypes.OVA]: AnimeTypes.OVA,
		[AnimeDtoTypes.ONA]: AnimeTypes.ONA,
		[AnimeDtoTypes.SPECIAL]: AnimeTypes.SPECIAL,
		[AnimeDtoTypes.TV]: AnimeTypes.TV,
		[AnimeDtoTypes.UNKNOWN]: AnimeTypes.UNKNOWN,
		[AnimeDtoTypes.MOVIE]: AnimeTypes.MOVIE,
	};

	const ANIME_STATUS_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
		[AnimeStatusDto.FINISHED]: AnimeStatus.FINISHED,
		[AnimeStatusDto.NOT_YET_AIRED]: AnimeStatus.NOT_YET_AIRED,
		[AnimeStatusDto.AIRING]: AnimeStatus.AIRING,
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
