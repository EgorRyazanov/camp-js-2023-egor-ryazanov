import { AnimeDto, AnimeStatusDto, AnimeDtoTypes } from '../../../core/dtos/anime-dto/anime.dto';
import { Anime } from '../../../core/models/anime/anime';
import { AnimeStatus } from '../../../core/models/anime/anime-status';
import { AnimeType } from '../../../core/models/anime/anime-type';

/** Anime Mapper. */
export namespace AnimeMapper {
	const ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeDtoTypes, AnimeType>> = {
		[AnimeDtoTypes.Music]: AnimeType.Music,
		[AnimeDtoTypes.Ova]: AnimeType.Ova,
		[AnimeDtoTypes.Ona]: AnimeType.Ona,
		[AnimeDtoTypes.Special]: AnimeType.Special,
		[AnimeDtoTypes.Tv]: AnimeType.Tv,
		[AnimeDtoTypes.Unknown]: AnimeType.Unknown,
		[AnimeDtoTypes.Movie]: AnimeType.Movie,
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
