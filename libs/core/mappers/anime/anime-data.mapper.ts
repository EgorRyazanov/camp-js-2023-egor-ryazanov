import { Injectable } from '@angular/core';

import { Login } from '../../../core/models/auth/login';
import { LoginDto } from '../../../core/dtos/auth-dto/login.dto';
import { ValidationErrorDto } from '../../../core/dtos/error.dto';
import { EntityValidationErrors } from '../../models/app-error';
import { MapperToDto, ValidationErrorMapper } from '../mappers';
import { extractErrorMessages } from '../../utils/extract-error-message';
import { AnimeDetailFormDto } from '@js-camp/core/dtos/anime-dto/anime-details-form.dto';
import { AnimeDetailForm } from '@js-camp/core/models/anime/anime-details-form';

/** Login DTO fields. */
enum AnimeDataDtoFields {
	Image = 'image',
	TrailerYoutubeId = 'trailer_youtube_id',
	TitleEnglish = 'title_eng',
	TitleJapanese = 'title_jpn',
	Type = 'type',
	Status = 'status',
	Source = 'source',
	Airing = 'airing',
	AiredNonFieldErrors = 'aired.non_field_errors',
	AiredStart = 'aired.start',
	AiredEnd = 'aired.end',
	Rating = 'rating',
	Season = 'season',
	Synopsis = 'synopsis',
	Studios = 'studios',
	Genres = 'genres',
}

/** Login data mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeDataMapper
	implements MapperToDto<AnimeDetailFormDto, AnimeDetailForm>, ValidationErrorMapper<AnimeDetailForm>
{
	/** @inheritdoc */
	public toDto(data: AnimeDetailForm): AnimeDetailFormDto {
		// return {
		// 	email: data.email,
		// 	password: data.password,
		// };
	}
}
