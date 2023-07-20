import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimePaginationDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimePagination } from '@js-camp/core/models/anime';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';
import { AnimeParametersMapper } from '@js-camp/core/mappers/anime-params.mapper';

import { AnimeParameters } from '@js-camp/core/models/anime-params';

import { createHttpParams } from '../utils/create-http-params';
import { LIMIT_ITEMS } from '../utils/constants';

/** Anime Service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	/** Path to get anime. */
	private readonly animePathname = '/api/v1/anime/anime/';

	public constructor(private readonly http: HttpClient) {}

	/**
	 * Get anime from server.
	 * @param page Current page index.
	 */
	public getAnimes(page: number): Observable<AnimePagination> {
		return this.http
			.get<AnimePaginationDto>(new URL(this.animePathname, environment.baseUrl).href, {
			params: createHttpParams(AnimeParametersMapper.toDto(new AnimeParameters({ offset: page * LIMIT_ITEMS, limit: LIMIT_ITEMS }))),
		})
			.pipe(
				map(animePaginationDto => AnimeMapper.fromAnimePaginationDto(animePaginationDto)),
				catchError((error: unknown) => {
					if (error instanceof Error) {
						throw new Error(error.message);
					}
					throw new Error('Something went wrong with anime service.');
				}),
			);
	}
}
