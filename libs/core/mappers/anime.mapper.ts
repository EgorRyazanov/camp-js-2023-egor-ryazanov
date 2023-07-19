import { AnimeDto, AnimePaginationDto } from '../dtos/anime.dto';
import { Anime, AnimePagination } from '../models/anime';

/** Anime Mapper. */
export namespace AnimeMapper {

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
			type: dto.type,
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
		});
	}

	/**
	 * Converts anime pagination DTO to anime pagination model.
	 * @param dto Anime pagination DTO.
	 */
	export function fromAnimePaginationDto(dto: AnimePaginationDto): AnimePagination {
		return {
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(animeDto => fromAnimeDto(animeDto)),
		};
	}
}
