import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AnimeDto, AnimePaginationDto } from '@js-camp/core/dtos/anime-dto/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { Anime, AnimePagination } from '@js-camp/core/models/anime/anime';
import { Observable, map } from 'rxjs';
import { AnimeParametersMapper } from '@js-camp/core/mappers/anime/anime-params.mapper';
import { AnimeParameters } from '@js-camp/core/models/anime/anime-params';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeDetailDto } from '@js-camp/core/dtos/anime-dto/anime-details.dto';
import { AnimeDetailMapper } from '@js-camp/core/mappers/anime/anime-details.mapper';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';

import { UrlService } from './url.service';
import { AnimeDetailForm } from '@js-camp/core/models/anime/anime-details-form';
import { AnimeDetailFormMapper } from '@js-camp/core/mappers/anime/anime-details-form.mapper';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	/** HTTP service. */
	private readonly httpService = inject(HttpClient);

	/** Url service. */
	private readonly urlService = inject(UrlService);

	/**
	 * Get anime from server.
	 * @param parameters Parameters of current request.
	 */
	public getAnimes(parameters: AnimeParameters): Observable<AnimePagination> {
		return this.httpService
			.get<AnimePaginationDto>(this.urlService.animeUrls.animes, {
				params: new HttpParams({ fromObject: { ...AnimeParametersMapper.toDto(parameters) } }),
			})
			.pipe(
				map((animePaginationDto) => PaginationMapper.fromDto<AnimeDto, Anime>(animePaginationDto, AnimeMapper.fromDto))
			);
	}

	/**
	 * Gets anime by ID.
	 * @param id ID of anime.
	 */
	public getAnime(id: string): Observable<AnimeDetail> {
		return this.httpService
			.get<AnimeDetailDto>(this.urlService.animeUrls.animesDetail(id))
			.pipe(map((dto) => AnimeDetailMapper.fromDto(dto)));
	}

	/**
	 * Gets anime by ID.
	 * @param id ID of anime.
	 */
	public deleteAnime(id: string): Observable<void> {
		return this.httpService.delete<void>(this.urlService.animeUrls.animesDetail(id));
	}

	public changeAnime(id: string, body: AnimeDetailForm): Observable<AnimeDetail> {
		return this.httpService
			.put<AnimeDetailDto>(this.urlService.animeUrls.animesDetail(id), AnimeDetailFormMapper.toDto(body))
			.pipe(map((dto) => AnimeDetailMapper.fromDto(dto)));
	}

	public createAnime(body: AnimeDetailForm): Observable<AnimeDetail> {
		return this.httpService
			.post<AnimeDetailDto>(this.urlService.animeUrls.animes, AnimeDetailFormMapper.toDto(body))
			.pipe(map((dto) => AnimeDetailMapper.fromDto(dto)));
	}
}
