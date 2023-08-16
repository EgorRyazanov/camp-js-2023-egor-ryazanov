import { Season } from '../../../core/models/season';
import { Rating } from '../../../core/models/rating';
import { Source } from '../../../core/models/anime/anime-source';
import { AnimeDetailDto, RatingDto, SeasonDto, SourceDto } from '../../../core/dtos/anime-dto/anime-details.dto';
import { AnimeDetail } from '../../../core/models/anime/anime-detail';
import { GenreMapper } from '../genre/genre.mapper';
import { StudioMapper } from '../studio/studio.mapper';

import { AnimeMapper } from './anime.mapper';

/** Anime Detail Mapper. */
export namespace AnimeDetailMapper {
	export const ANIME_RATING_FROM_DTO: Readonly<Record<RatingDto, Rating>> = {
		[RatingDto.G]: Rating.G,
		[RatingDto.PG]: Rating.PG,
		[RatingDto.PG_13]: Rating.PG_13,
		[RatingDto.R_17]: Rating.R_17,
		[RatingDto.R_PLUS]: Rating.R_PLUS,
		[RatingDto.R_X]: Rating.R_X,
		[RatingDto.Unknown]: Rating.Unknown,
	};

	export const SEASON_FROM_DTO: Readonly<Record<SeasonDto, Season>> = {
		[SeasonDto.Fall]: Season.Fall,
		[SeasonDto.NonSeasonal]: Season.NonSeasonal,
		[SeasonDto.Spring]: Season.Spring,
		[SeasonDto.Summer]: Season.Summer,
		[SeasonDto.Winter]: Season.Winter,
	};

	export const SOURCE_FROM_DTO: Readonly<Record<SourceDto, Source>> = {
		[SourceDto.Book]: Source.Book,
		[SourceDto.CardGame]: Source.CardGame,
		[SourceDto.FourKomaManga]: Source.FourKomaManga,
		[SourceDto.Game]: Source.Game,
		[SourceDto.LightNovel]: Source.LightNovel,
		[SourceDto.Manga]: Source.Manga,
		[SourceDto.MixedMedia]: Source.MixedMedia,
		[SourceDto.Music]: Source.Music,
		[SourceDto.Novel]: Source.Novel,
		[SourceDto.Original]: Source.Original,
		[SourceDto.Other]: Source.Other,
		[SourceDto.PictureBook]: Source.PictureBook,
		[SourceDto.WebNovel]: Source.WebNovel,
		[SourceDto.WebManga]: Source.WebManga,
		[SourceDto.VisialNovel]: Source.VisialNovel,
		[SourceDto.Unknown]: Source.Unknown,
		[SourceDto.Radio]: Source.Radio,
	};

	/**
	 * Converts Anime details from DTO to model.
	 * @param dto Anime detail DTO.
	 */
	export function fromDto(dto: AnimeDetailDto): AnimeDetail {
		return {
			...AnimeMapper.fromDto({
				id: dto.id,
				aired: dto.aired,
				image: dto.image,
				status: dto.status,
				title_eng: dto.title_eng,
				title_jpn: dto.title_jpn,
				type: dto.type,
			}),
			airing: dto.airing,
			created: new Date(dto.created),
			genresData: dto.genres_data.map((genresDto) => GenreMapper.fromDto(genresDto)),
			modified: new Date(dto.modified),
			rating: ANIME_RATING_FROM_DTO[dto.rating],
			season: SEASON_FROM_DTO[dto.season],
			source: SOURCE_FROM_DTO[dto.source],
			studiosData: dto.studios_data.map((studioDto) => StudioMapper.fromDto(studioDto)),
			synopsis: dto.synopsis,
			trailerYoutubeUrl: dto.trailer_youtube_id ? `https://www.youtube.com/embed/${dto.trailer_youtube_id}` : null,
		};
	}
}
