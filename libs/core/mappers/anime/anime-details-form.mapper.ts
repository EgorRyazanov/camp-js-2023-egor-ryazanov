import { AnimeDetailFormDto } from '../../dtos/anime-dto/anime-details-form.dto';
import { AnimeDetailForm } from '../../models/anime/anime-details-form';
import { AnimeTypeDto, AnimeStatusDto } from '../../dtos/anime-dto/anime.dto';
import { AnimeType } from '../../models/anime/anime-type';
import { AnimeStatus } from '../../models/anime/anime-status';
import { BASE_SHARE_YOUTUBE_URL } from '../../utils/contansts';
import { RatingDto, SeasonDto, SourceDto } from '../../../core/dtos/anime-dto/anime-details.dto';
import { Source } from '../../../core/models/anime/anime-source';
import { Rating } from '../../../core/models/rating';
import { Season } from '../../../core/models/season';
import { AiredMapper } from '../aired.mapper';

/** Anime Detail Form Mapper. */
export namespace AnimeDetailFormMapper {
	export const ANIME_RATING_TO_DTO: Readonly<Record<Rating, RatingDto>> = {
		[Rating.G]: RatingDto.G,
		[Rating.PG]: RatingDto.PG,
		[Rating.PG_13]: RatingDto.PG_13,
		[Rating.R_17]: RatingDto.R_17,
		[Rating.R_PLUS]: RatingDto.R_PLUS,
		[Rating.R_X]: RatingDto.R_X,
		[Rating.Unknown]: RatingDto.Unknown,
	};

	export const SEASON_TO_DTO: Readonly<Record<Season, SeasonDto>> = {
		[Season.Fall]: SeasonDto.Fall,
		[Season.NonSeasonal]: SeasonDto.NonSeasonal,
		[Season.Spring]: SeasonDto.Spring,
		[Season.Summer]: SeasonDto.Summer,
		[Season.Winter]: SeasonDto.Winter,
	};

	export const SOURCE_TO_DTO: Readonly<Record<Source, SourceDto>> = {
		[Source.Book]: SourceDto.Book,
		[Source.CardGame]: SourceDto.CardGame,
		[Source.FourKomaManga]: SourceDto.FourKomaManga,
		[Source.Game]: SourceDto.Game,
		[Source.LightNovel]: SourceDto.LightNovel,
		[Source.Manga]: SourceDto.Manga,
		[Source.MixedMedia]: SourceDto.MixedMedia,
		[Source.Music]: SourceDto.Music,
		[Source.Novel]: SourceDto.Novel,
		[Source.Original]: SourceDto.Original,
		[Source.Other]: SourceDto.Other,
		[Source.PictureBook]: SourceDto.PictureBook,
		[Source.WebNovel]: SourceDto.WebNovel,
		[Source.WebManga]: SourceDto.WebManga,
		[Source.VisialNovel]: SourceDto.VisialNovel,
		[Source.Unknown]: SourceDto.Unknown,
		[Source.Radio]: SourceDto.Radio,
	};

	export const ANIME_TYPE_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Ova]: AnimeTypeDto.Ova,
		[AnimeType.Ona]: AnimeTypeDto.Ona,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.Tv]: AnimeTypeDto.Tv,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
		[AnimeType.Movie]: AnimeTypeDto.Movie,
	};

	export const ANIME_STATUS_TO_DTO: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
	};

	/**
	 * Converts Anime details form to DTO from model.
	 * @param model Anime detail form model.
	 */
	export function toDto(model: AnimeDetailForm): AnimeDetailFormDto {
		return {
			aired: AiredMapper.toDto(model.aired),
			airing: model.airing,
			created: model.created?.toISOString() ?? null,
			image: model.imageUrl,
			modified: model.modified?.toISOString() ?? null,
			rating: ANIME_RATING_TO_DTO[model.rating],
			season: SEASON_TO_DTO[model.season],
			source: SOURCE_TO_DTO[model.source],
			status: ANIME_STATUS_TO_DTO[model.status],
			synopsis: model.synopsis,
			title_eng: model.titleEnglish,
			title_jpn: model.titleJapanese,
			trailer_youtube_id: model.trailerYoutubeUrl?.startsWith(BASE_SHARE_YOUTUBE_URL)
				? model.trailerYoutubeUrl?.replace(BASE_SHARE_YOUTUBE_URL, '')
				: null,
			type: ANIME_TYPE_TO_DTO[model.type],
			studios: model.studios.map((studio) => studio.id),
			genres: model.genres.map((genre) => genre.id),
		};
	}
}
