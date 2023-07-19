import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimePaginationDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimePagination } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';
import { BASE_ANIME_PARAMS } from '@js-camp/core/utils/constants';
import { environment } from '@js-camp/angular/environments/environment';
import { AnimeParamsMapper } from '@js-camp/core/mappers/anime-params.mapper';
import { createHttpParams } from '../utils/create-http-params';

@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly animePathname = '/api/v1/anime/anime/';

	public constructor(private readonly http: HttpClient) {}

	getAnimes(): Observable<AnimePagination> {
		return this.http
			.get<AnimePaginationDto>(new URL(this.animePathname, environment.baseUrl).href, {
				params: createHttpParams(AnimeParamsMapper.toDto(BASE_ANIME_PARAMS)),
			})
			.pipe(map((animePaginationDto) => AnimeMapper.fromAnimePaginationDto(animePaginationDto)));
	}
}
