import { Seasons } from '../../../core/models/season';
import { Ratings } from '../../../core/models/rating';
import { Sources } from '../../../core/models/anime/anime-source';
import { AnimeDetailDto, RatingDto, SeasonsDto, SourceDto } from '../../../core/dtos/anime-dto/anime-details.dto';
import { AnimeDetail } from '../../../core/models/anime/anime-detail';
import { GenreMapper } from '../genre/genre.mapper';
import { StudioMapper } from '../studio/studio.mapper';

import { AnimeMapper } from './anime.mapper';

/** Anime Detail Mapper. */
export namespace AnimeDetailMapper {
	export const ANIME_RATING_FROM_DTO: Readonly<Record<RatingDto, Ratings>> = {
		[RatingDto.G]: Ratings.G,
		[RatingDto.PG]: Ratings.PG,
		[RatingDto.PG_13]: Ratings.PG_13,
		[RatingDto.R_17]: Ratings.R_17,
		[RatingDto.R_PLUS]: Ratings.R_PLUS,
		[RatingDto.R_X]: Ratings.R_X,
		[RatingDto.Unknown]: Ratings.Unknown,
	};

	export const SEASON_FROM_DTO: Readonly<Record<SeasonsDto, Seasons>> = {
		[SeasonsDto.Fall]: Seasons.Fall,
		[SeasonsDto.NonSeasonal]: Seasons.NonSeasonal,
		[SeasonsDto.Spring]: Seasons.Spring,
		[SeasonsDto.Summer]: Seasons.Summer,
		[SeasonsDto.Winter]: Seasons.Winter,
	};

	export const SOURCE_FROM_DTO: Readonly<Record<SourceDto, Sources>> = {
		[SourceDto.Book]: Sources.Book,
		[SourceDto.CardGame]: Sources.CardGame,
		[SourceDto.FourKomaManga]: Sources.FourKomaManga,
		[SourceDto.Game]: Sources.Game,
		[SourceDto.LightNovel]: Sources.LightNovel,
		[SourceDto.Manga]: Sources.Manga,
		[SourceDto.MixedMedia]: Sources.MixedMedia,
		[SourceDto.Music]: Sources.Music,
		[SourceDto.Novel]: Sources.Novel,
		[SourceDto.Original]: Sources.Original,
		[SourceDto.Other]: Sources.Other,
		[SourceDto.PictureBook]: Sources.PictureBook,
		[SourceDto.WebNovel]: Sources.WebNovel,
		[SourceDto.WebManga]: Sources.WebManga,
		[SourceDto.VisialNovel]: Sources.VisialNovel,
		[SourceDto.Unknown]: Sources.Unknown,
		[SourceDto.Radio]: Sources.Radio,
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
			genresData: dto.genres_data.map(genresDto => GenreMapper.fromDto(genresDto)),
			modified: new Date(dto.modified),
			rating: ANIME_RATING_FROM_DTO[dto.rating],
			season: SEASON_FROM_DTO[dto.season],
			source: SOURCE_FROM_DTO[dto.source],
			studiosData: dto.studios_data.map(studioDto => StudioMapper.fromDto(studioDto)),
			synopsis: dto.synopsis,
			trailerYoutubeUrl: dto.trailer_youtube_id ? `https://www.youtube.com/embed/${dto.trailer_youtube_id}` : null,
		};
	}
}
