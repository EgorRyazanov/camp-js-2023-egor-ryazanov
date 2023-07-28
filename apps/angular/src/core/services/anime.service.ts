import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimeDto, AnimePaginationDto } from '@js-camp/core/dtos/anime-dto/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { Anime, AnimePagination } from '@js-camp/core/models/anime/anime';
import { Observable, map } from 'rxjs';
import { AnimeParametersMapper } from '@js-camp/core/mappers/anime/anime-params.mapper';
import { AnimeParameters } from '@js-camp/core/models/anime/anime-params';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { UrlService } from './url.service';

/** Anime Service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	public constructor(private readonly http: HttpClient, private readonly urlService: UrlService) {}

	/**
	 * Get anime from server.
	 * @param parameters Parameters of current request.
	 */
	public getAnimes(parameters: AnimeParameters): Observable<AnimePagination> {
		return this.http
			.get<AnimePaginationDto>(this.urlService.animeUrls.animes, {
				params: createHttpParams({ ...AnimeParametersMapper.toDto(new AnimeParameters(parameters)) }),
			})
			.pipe(
				map((animePaginationDto) =>
					PaginationMapper.fromPaginationDto<AnimeDto, Anime>(animePaginationDto, AnimeMapper.fromAnimeDto)
				)
			);
	}
}
