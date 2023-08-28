import { Injectable } from '@angular/core';

import { ValidationErrorDto } from '../../../core/dtos/error.dto';
import { EntityValidationErrors } from '../../../core/models/app-error';
import { extractErrorMessages } from '../../../core/utils/extract-error-message';
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
import { MapperToDto, ValidationErrorMapper } from '../mappers';

/** Anime data DTO fields. */
enum AnimeDataDtoFields {
	Image = 'image',
	TrailerYoutubeId = 'trailer_youtube_id',
	TitleEnglish = 'title_eng',
	TitleJapanese = 'title_jpn',
	Type = 'type',
	Status = 'status',
	AnimeSource = 'source',
	Airing = 'airing',
	AiredNonFieldErrors = 'aired.non_field_errors',
	AiredStart = 'aired.start',
	AiredEnd = 'aired.end',
	AnimeRating = 'rating',
	AnimeSeason = 'season',
	Synopsis = 'synopsis',
	Studios = 'studios',
	Genres = 'genres',
}

/** Anime Detail Form Mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeDetailFormMapper
implements MapperToDto<AnimeDetailFormDto, AnimeDetailForm>, ValidationErrorMapper<AnimeDetailForm> {
	/** @inheritdoc */
	public validationErrorFromDto(
		errorsDto: ValidationErrorDto[] | null | undefined,
	): EntityValidationErrors<AnimeDetailForm> {
		const titleEnglish = extractErrorMessages(errorsDto, AnimeDataDtoFields.TitleEnglish);
		const nonFieldErrors = extractErrorMessages(errorsDto, null);
		const airedNonFields = extractErrorMessages(errorsDto, AnimeDataDtoFields.AiredNonFieldErrors);
		const airedStart = extractErrorMessages(errorsDto, AnimeDataDtoFields.AiredStart);
		const airedEnd = extractErrorMessages(errorsDto, AnimeDataDtoFields.AiredEnd);
		return {
			titleJapanese: extractErrorMessages(errorsDto, AnimeDataDtoFields.TitleJapanese),
			imageFile: extractErrorMessages(errorsDto, AnimeDataDtoFields.Image),
			trailerYoutubeUrl: extractErrorMessages(errorsDto, AnimeDataDtoFields.TrailerYoutubeId),
			titleEnglish: nonFieldErrors ?? titleEnglish,
			type: extractErrorMessages(errorsDto, AnimeDataDtoFields.Type),
			status: extractErrorMessages(errorsDto, AnimeDataDtoFields.Status),
			source: extractErrorMessages(errorsDto, AnimeDataDtoFields.AnimeSource),
			airing: extractErrorMessages(errorsDto, AnimeDataDtoFields.Airing) ?? airedNonFields,
			aired: airedStart ?? airedEnd,
			rating: extractErrorMessages(errorsDto, AnimeDataDtoFields.AnimeRating),
			season: extractErrorMessages(errorsDto, AnimeDataDtoFields.AnimeSeason),
			synopsis: extractErrorMessages(errorsDto, AnimeDataDtoFields.Synopsis),
			studios: extractErrorMessages(errorsDto, AnimeDataDtoFields.Studios),
			genres: extractErrorMessages(errorsDto, AnimeDataDtoFields.Genres),
		};
	}

	private readonly ANIME_RATING_TO_DTO: Readonly<Record<Rating, RatingDto>> = {
		[Rating.G]: RatingDto.G,
		[Rating.PG]: RatingDto.PG,
		[Rating.PG_13]: RatingDto.PG_13,
		[Rating.R_17]: RatingDto.R_17,
		[Rating.R_PLUS]: RatingDto.R_PLUS,
		[Rating.R_X]: RatingDto.R_X,
		[Rating.Unknown]: RatingDto.Unknown,
	};

	private readonly SEASON_TO_DTO: Readonly<Record<Season, SeasonDto>> = {
		[Season.Fall]: SeasonDto.Fall,
		[Season.NonSeasonal]: SeasonDto.NonSeasonal,
		[Season.Spring]: SeasonDto.Spring,
		[Season.Summer]: SeasonDto.Summer,
		[Season.Winter]: SeasonDto.Winter,
	};

	private readonly SOURCE_TO_DTO: Readonly<Record<Source, SourceDto>> = {
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

	private readonly ANIME_TYPE_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Ova]: AnimeTypeDto.Ova,
		[AnimeType.Ona]: AnimeTypeDto.Ona,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.Tv]: AnimeTypeDto.Tv,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
		[AnimeType.Movie]: AnimeTypeDto.Movie,
	};

	private readonly ANIME_STATUS_TO_DTO: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
	};

	/**
	 * Converts Anime details form to DTO from model.
	 * @param model Anime detail form model.
	 */
	public toDto(model: AnimeDetailForm): AnimeDetailFormDto {
		return {
			aired: AiredMapper.toDto(model.aired),
			airing: model.airing,
			image: model.imageUrl,
			rating: this.ANIME_RATING_TO_DTO[model.rating],
			season: this.SEASON_TO_DTO[model.season],
			source: this.SOURCE_TO_DTO[model.source],
			status: this.ANIME_STATUS_TO_DTO[model.status],
			synopsis: model.synopsis,
			title_eng: model.titleEnglish,
			title_jpn: model.titleJapanese,
			trailer_youtube_id: model.trailerYoutubeUrl?.startsWith(BASE_SHARE_YOUTUBE_URL) ?
				model.trailerYoutubeUrl?.replace(BASE_SHARE_YOUTUBE_URL, '') :
				null,
			type: this.ANIME_TYPE_TO_DTO[model.type],
			studios: model.studios.map(studio => studio.id),
			genres: model.genres.map(genre => genre.id),
		};
	}
}
