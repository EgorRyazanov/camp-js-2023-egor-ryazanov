import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { UrlService } from './url.service';
import { Genre } from '@js-camp/core/models/genre/genre';
import { GenreParams } from '@js-camp/core/models/genre/genre-params';
import { GenreParamsMapper } from '@js-camp/core/mappers/genre/genre-param.mapper';
import { GenreDto, GenrePaginationDto } from '@js-camp/core/dtos/genre-dto/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre/genre.mapper';
import { Pagination } from '@js-camp/core/models/pagintation';

/** Anime service. */
@Injectable()
export class GenresService {
	/** HTTP service. */

	/** Url service. */
	private readonly urlService = inject(UrlService);

	constructor(private readonly httpService: HttpClient) {}

	/**
	 * Get anime from server.
	 * @param parameters Parameters of current request.
	 */
	public get(parameters: GenreParams): Observable<Pagination<Genre>> {
		return this.httpService
			.get<GenrePaginationDto>(this.urlService.genresUrls.genres, {
				params: new HttpParams({ fromObject: { ...GenreParamsMapper.toDto(parameters) } }),
			})
			.pipe(
				map((genrePaginationDto) => PaginationMapper.fromDto<GenreDto, Genre>(genrePaginationDto, GenreMapper.fromDto))
			);
	}

	public create(params: GenreParams): Observable<Genre> {
		return this.httpService
			.post<GenreDto>(this.urlService.genresUrls.genres, { name: params.name, type: 'GENRES' })
			.pipe(map((genreDto) => GenreMapper.fromDto(genreDto)));
	}
}
