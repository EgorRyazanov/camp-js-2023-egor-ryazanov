import { AnimeDto, AnimeStatusDto, RatingDto } from '../dtos/anime.dto';
import { Anime, AnimeStatus, Rating } from '../models/anime';
import { AnimeDtoTypes } from '../dtos/anime.dto';
import { AnimeTypes } from '../models/anime';

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

	const ANIME_RATING_FROM_DTO: Readonly<Record<RatingDto, Rating>> = {
		[RatingDto.G]: Rating.G,
		[RatingDto.PG]: Rating.PG,
		[RatingDto.PG_13]: Rating.PG_13,
		[RatingDto.R_17]: Rating.R_17,
		[RatingDto.R_PLUS]: Rating.R_PLUS,
		[RatingDto.R_X]: Rating.R_X,
		[RatingDto.UNKNOWN]: Rating.UNKNOWN,
	};
	/**
	 * Converts anime DTO to anime model.
	 * @param dto Anime GTO.
	 */
	export function fromAnimeDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			created: dto.created,
			modified: dto.modified,
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
