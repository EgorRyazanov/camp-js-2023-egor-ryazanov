import { AnimeDetailDto, RatingDto, SeasonsDTO, SourceDTO } from '../../../core/dtos/anime-dto/anime-details.dto';
import { AnimeDetail, Rating, Seasons, Source } from '../../../core/models/anime/anime-detail';
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

	export const SEASON_FROM_DTO: Readonly<Record<SeasonsDTO, Seasons>> = {
		[SeasonsDTO.Fall]: Seasons.Fall,
		[SeasonsDTO.NonSeasonal]: Seasons.NonSeasonal,
		[SeasonsDTO.Spring]: Seasons.Spring,
		[SeasonsDTO.Summer]: Seasons.Summer,
		[SeasonsDTO.Winter]: Seasons.Winter,
	};

	export const SOURCE_FROM_DTO: Readonly<Record<SourceDTO, Source>> = {
		[SourceDTO.Book]: Source.Book,
		[SourceDTO.CardGame]: Source.CardGame,
		[SourceDTO.FourKomaManga]: Source.FourKomaManga,
		[SourceDTO.Game]: Source.Game,
		[SourceDTO.LightNovel]: Source.LightNovel,
		[SourceDTO.Manga]: Source.Manga,
		[SourceDTO.MixedMedia]: Source.MixedMedia,
		[SourceDTO.Music]: Source.Music,
		[SourceDTO.Novel]: Source.Novel,
		[SourceDTO.Original]: Source.Original,
		[SourceDTO.Other]: Source.Other,
		[SourceDTO.PictureBook]: Source.PictureBook,
		[SourceDTO.WebNovel]: Source.WebNovel,
		[SourceDTO.WebManga]: Source.WebManga,
		[SourceDTO.VisialNovel]: Source.VisialNovel,
		[SourceDTO.Unknown]: Source.Unknown,
		[SourceDTO.Radio]: Source.Radio,
	};

	/**
	 * Converts Anime details from DTO to model.
	 * @param dto Anime detail DTO.
	 */
	export function fromDto(dto: AnimeDetailDto): AnimeDetail {
		return {
			id: dto.id,
			aired: {
				start: new Date(dto.aired.start ?? ''),
				end: new Date(dto.aired.end ?? ''),
			},
			airing: dto.airing,
			created: new Date(dto.created),
			genresData: dto.genres_data.map((genresDto) => GenreMapper.fromDto(genresDto)),
			image: dto.image,
			modified: new Date(dto.modified),
			rating: ANIME_RATING_FROM_DTO[dto.rating],
			season: SEASON_FROM_DTO[dto.season],
			source: SOURCE_FROM_DTO[dto.source],
			status: AnimeMapper.ANIME_STATUS_FROM_DTO[dto.status],
			studiosData: dto.studios_data.map((studioDto) => StudioMapper.fromDto(studioDto)),
			synopsis: dto.synopsis,
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			trailerYoutubeUrl: dto.trailer_youtube_id ? `https://www.youtube.com/embed/${dto.trailer_youtube_id}` : null,
			type: AnimeMapper.ANIME_TYPE_FROM_DTO[dto.type],
		};
	}
}
