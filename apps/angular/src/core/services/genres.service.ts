import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { Genre, GenreTypes } from '@js-camp/core/models/genre/genre';
import { GenreDto, GenrePaginationDto } from '@js-camp/core/dtos/genre-dto/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre/genre.mapper';
import { Pagination } from '@js-camp/core/models/pagintation';
import { DefaultParams } from '@js-camp/core/models/default-params';
import { DefaultParamsMapper } from '@js-camp/core/mappers/default-params.mapper';

import { AppErrorMapper } from '../utils/app-error.mapper';

import { UrlService } from './url.service';

/** Genres service. */
@Injectable({
	providedIn: 'root',
})
export class GenresService {
	private readonly httpService = inject(HttpClient);

	private readonly urlService = inject(UrlService);

	private readonly appErrorMapper = inject(AppErrorMapper);

	/**
	 * Get genres.
	 * @param parameters Parameters of current request.
	 */
	public get(parameters: DefaultParams): Observable<Pagination<Genre>> {
		return this.httpService
			.get<GenrePaginationDto>(this.urlService.genresUrls.genres, {
			params: new HttpParams({ fromObject: { ...DefaultParamsMapper.toDto(parameters) } }),
		})
			.pipe(
				map(genrePaginationDto => PaginationMapper.fromDto<GenreDto, Genre>(genrePaginationDto, GenreMapper.fromDto)),
				this.appErrorMapper.catchHttpErrorToAppError(),
			);
	}

	/**
	 * Creates genres.
	 * @param parameters Parameters of current request.
	 */
	public create(parameters: DefaultParams): Observable<Genre> {
		return this.httpService
			.post<GenreDto>(this.urlService.genresUrls.genres, { name: parameters.name, type: GenreTypes.Genres })
			.pipe(
				map(genreDto => GenreMapper.fromDto(genreDto)),
				this.appErrorMapper.catchHttpErrorToAppError(),
			);
	}
}
