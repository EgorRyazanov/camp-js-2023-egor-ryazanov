import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimePaginationDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';
import { BASE_ANIME_PARAMS, BASE_URL } from '@js-camp/core/utils/constants';
import { environment } from '@js-camp/angular/environments/environment';
import { AnimeParamsMapper } from '@js-camp/core/mappers/anime-params.mapper';
import { createHttpParams } from '../utils/create-http-params';

@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private animePathname = '/api/v1/anime/anime/';

	httpOptions = {
		params: createHttpParams(AnimeParamsMapper.toDto(BASE_ANIME_PARAMS)),
		headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Api-Key': environment.apiKey }),
	};

	constructor(private http: HttpClient) {}

	getAnimes(): Observable<Anime[]> {
		return this.http
			.get<AnimePaginationDto>(new URL(this.animePathname, BASE_URL).href, this.httpOptions)
			.pipe(map((animePaginationDto) => animePaginationDto.results.map((anime) => AnimeMapper.fromDto(anime))));
	}
}
