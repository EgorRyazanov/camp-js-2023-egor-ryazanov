import { Seasons } from '../../../core/models/season';
import { Ratings } from '../../../core/models/rating';
import { Sources } from '../../../core/models/anime/anime-source';
import { AnimeDetailDto, RatingDto, SeasonsDTO, SourceDTO } from '../../../core/dtos/anime-dto/anime-details.dto';
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

	export const SEASON_FROM_DTO: Readonly<Record<SeasonsDTO, Seasons>> = {
		[SeasonsDTO.Fall]: Seasons.Fall,
		[SeasonsDTO.NonSeasonal]: Seasons.NonSeasonal,
		[SeasonsDTO.Spring]: Seasons.Spring,
		[SeasonsDTO.Summer]: Seasons.Summer,
		[SeasonsDTO.Winter]: Seasons.Winter,
	};

	export const SOURCE_FROM_DTO: Readonly<Record<SourceDTO, Sources>> = {
		[SourceDTO.Book]: Sources.Book,
		[SourceDTO.CardGame]: Sources.CardGame,
		[SourceDTO.FourKomaManga]: Sources.FourKomaManga,
		[SourceDTO.Game]: Sources.Game,
		[SourceDTO.LightNovel]: Sources.LightNovel,
		[SourceDTO.Manga]: Sources.Manga,
		[SourceDTO.MixedMedia]: Sources.MixedMedia,
		[SourceDTO.Music]: Sources.Music,
		[SourceDTO.Novel]: Sources.Novel,
		[SourceDTO.Original]: Sources.Original,
		[SourceDTO.Other]: Sources.Other,
		[SourceDTO.PictureBook]: Sources.PictureBook,
		[SourceDTO.WebNovel]: Sources.WebNovel,
		[SourceDTO.WebManga]: Sources.WebManga,
		[SourceDTO.VisialNovel]: Sources.VisialNovel,
		[SourceDTO.Unknown]: Sources.Unknown,
		[SourceDTO.Radio]: Sources.Radio,
	};

	/**
	 * Converts Anime details from DTO to model.
	 * @param dto Anime detail DTO.
	 */
	export function fromDto(dto: AnimeDetailDto): AnimeDetail {
		return {
			id: dto.id,
			aired: {
				start: dto.aired.start ? new Date(dto.aired.start) : null,
				end: dto.aired.end ? new Date(dto.aired.end) : null,
			},
			airing: dto.airing,
			created: new Date(dto.created),
			genresData: dto.genres_data.map(genresDto => GenreMapper.fromDto(genresDto)),
			image: dto.image,
			modified: new Date(dto.modified),
			rating: ANIME_RATING_FROM_DTO[dto.rating],
			season: SEASON_FROM_DTO[dto.season],
			source: SOURCE_FROM_DTO[dto.source],
			status: AnimeMapper.ANIME_STATUS_FROM_DTO[dto.status],
			studiosData: dto.studios_data.map(studioDto => StudioMapper.fromDto(studioDto)),
			synopsis: dto.synopsis,
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			trailerYoutubeUrl: dto.trailer_youtube_id ? `https://www.youtube.com/embed/${dto.trailer_youtube_id}` : null,
			type: AnimeMapper.ANIME_TYPE_FROM_DTO[dto.type],
		};
	}
}
