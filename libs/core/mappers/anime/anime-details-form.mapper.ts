import { Seasons } from '../../../core/models/season';
import { Ratings } from '../../../core/models/rating';
import { Sources } from '../../../core/models/anime/anime-source';
import { RatingDto, SeasonsDTO, SourceDTO } from '../../../core/dtos/anime-dto/anime-details.dto';
import { AnimeDetailFormDto } from '@js-camp/core/dtos/anime-dto/anime-details-form.dto';
import { AnimeDetailForm } from '@js-camp/core/models/anime/anime-details-form';
import { AnimeDtoTypes, AnimeStatusDto } from '@js-camp/core/dtos/anime-dto/anime.dto';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { AnimeStatuses } from '@js-camp/core/models/anime/anime-status';
import { BASE_SHARE_YOUTUBE_URL } from '@js-camp/core/utils/contansts';

/** Anime Detail Form Mapper. */
export namespace AnimeDetailFormMapper {
	export const ANIME_RATING_TO_DTO: Readonly<Record<Ratings, RatingDto>> = {
		[Ratings.G]: RatingDto.G,
		[Ratings.PG]: RatingDto.PG,
		[Ratings.PG_13]: RatingDto.PG_13,
		[Ratings.R_17]: RatingDto.R_17,
		[Ratings.R_PLUS]: RatingDto.R_PLUS,
		[Ratings.R_X]: RatingDto.R_X,
		[Ratings.Unknown]: RatingDto.Unknown,
	};

	export const SEASON_TO_DTO: Readonly<Record<Seasons, SeasonsDTO>> = {
		[Seasons.Fall]: SeasonsDTO.Fall,
		[Seasons.NonSeasonal]: SeasonsDTO.NonSeasonal,
		[Seasons.Spring]: SeasonsDTO.Spring,
		[Seasons.Summer]: SeasonsDTO.Summer,
		[Seasons.Winter]: SeasonsDTO.Winter,
	};

	export const SOURCE_TO_DTO: Readonly<Record<Sources, SourceDTO>> = {
		[Sources.Book]: SourceDTO.Book,
		[Sources.CardGame]: SourceDTO.CardGame,
		[Sources.FourKomaManga]: SourceDTO.FourKomaManga,
		[Sources.Game]: SourceDTO.Game,
		[Sources.LightNovel]: SourceDTO.LightNovel,
		[Sources.Manga]: SourceDTO.Manga,
		[Sources.MixedMedia]: SourceDTO.MixedMedia,
		[Sources.Music]: SourceDTO.Music,
		[Sources.Novel]: SourceDTO.Novel,
		[Sources.Original]: SourceDTO.Original,
		[Sources.Other]: SourceDTO.Other,
		[Sources.PictureBook]: SourceDTO.PictureBook,
		[Sources.WebNovel]: SourceDTO.WebNovel,
		[Sources.WebManga]: SourceDTO.WebManga,
		[Sources.VisialNovel]: SourceDTO.VisialNovel,
		[Sources.Unknown]: SourceDTO.Unknown,
		[Sources.Radio]: SourceDTO.Radio,
	};

	export const ANIME_TYPE_TO_DTO: Readonly<Record<AnimeType, AnimeDtoTypes>> = {
		[AnimeType.Music]: AnimeDtoTypes.Music,
		[AnimeType.Ova]: AnimeDtoTypes.Ova,
		[AnimeType.Ona]: AnimeDtoTypes.Ona,
		[AnimeType.Special]: AnimeDtoTypes.Special,
		[AnimeType.Tv]: AnimeDtoTypes.Tv,
		[AnimeType.Unknown]: AnimeDtoTypes.Unknown,
		[AnimeType.Movie]: AnimeDtoTypes.Movie,
	};

	export const ANIME_STATUS_TO_DTO: Readonly<Record<AnimeStatuses, AnimeStatusDto>> = {
		[AnimeStatuses.Finished]: AnimeStatusDto.Finished,
		[AnimeStatuses.NotYetAired]: AnimeStatusDto.NotYetAired,
		[AnimeStatuses.Airing]: AnimeStatusDto.Airing,
	};

	/**
	 * Converts Anime details form to DTO from model.
	 * @param model Anime detail form model.
	 */
	export function toDto(model: AnimeDetailForm): AnimeDetailFormDto {
		return {
			aired: {
				start: model.aired.start?.toISOString() ?? null,
				end: model.aired.end?.toISOString() ?? null,
			},
			airing: model.airing,
			created: model.created?.toISOString() ?? null,
			image: model.image,
			modified: model.modified?.toISOString() ?? null,
			rating: ANIME_RATING_TO_DTO[model.rating],
			season: SEASON_TO_DTO[model.season],
			source: SOURCE_TO_DTO[model.source],
			status: ANIME_STATUS_TO_DTO[model.status],
			synopsis: model.synopsis,
			title_eng: model.titleEnglish,
			title_jpn: model.titleJapanese,
			trailer_youtube_id: model.trailerYoutubeUrl?.replace(BASE_SHARE_YOUTUBE_URL, '') ?? null,
			type: ANIME_TYPE_TO_DTO[model.type],
			studios: model.studios.map((studio) => studio.id),
			genres: model.genres.map((genre) => genre.id),
		};
	}
}
