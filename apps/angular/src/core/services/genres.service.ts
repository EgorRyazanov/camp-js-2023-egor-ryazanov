import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { UrlService } from './url.service';
import { Genre, GenrePagination } from '@js-camp/core/models/genre/genre';
import { GenreParams } from '@js-camp/core/models/genre/genre-params';
import { GenreParamsMapper } from '@js-camp/core/mappers/genre/genre-param.mapper';
import { GenreDto, GenrePaginationDto } from '@js-camp/core/dtos/genre-dto/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre/genre.mapper';

/** Anime service. */
@Injectable()
export class GenresService {
	/** HTTP service. */
	private readonly httpService = inject(HttpClient);

	/** Url service. */
	private readonly urlService = inject(UrlService);

	/**
	 * Get anime from server.
	 * @param parameters Parameters of current request.
	 */
	public getGenres(parameters: GenreParams): Observable<GenrePagination> {
		return this.httpService
			.get<GenrePaginationDto>(this.urlService.genresUrls.genres, {
				params: new HttpParams({ fromObject: { ...GenreParamsMapper.toDto(parameters) } }),
			})
			.pipe(
				map((genrePaginationDto) => PaginationMapper.fromDto<GenreDto, Genre>(genrePaginationDto, GenreMapper.fromDto))
			);
	}

	public createGenre(name: string): Observable<Genre> {
		return this.httpService
			.post<GenreDto>(this.urlService.genresUrls.genres, { name, type: 'GENRES' })
			.pipe(map((genreDto) => GenreMapper.fromDto(genreDto)));
	}
}
