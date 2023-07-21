import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimePaginationDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimePagination } from '@js-camp/core/models/anime';
import { Observable, catchError, map } from 'rxjs';
import { AnimeParametersMapper } from '@js-camp/core/mappers/anime-params.mapper';
import { AnimeParameters } from '@js-camp/core/models/anime-params';

import { createHttpParams } from '../utils/create-http-params';

import { UrlService } from './url.service';

/** Anime Service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	/** Path to get anime. */
	private readonly animePathname = '/api/v1/anime/anime/';

	public constructor(private readonly http: HttpClient, private readonly urlService: UrlService) {}

	/**
	 * Get anime from server.
	 * @param parameters Parameters of current request.
	 */
	public getAnimes(parameters: AnimeParameters): Observable<AnimePagination> {
		return this.http
			.get<AnimePaginationDto>(this.urlService.generateURI(this.animePathname), {
			params: createHttpParams(AnimeParametersMapper.toDto(new AnimeParameters(parameters))),
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
