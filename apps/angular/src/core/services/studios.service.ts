import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { UrlService } from './url.service';
import { Genre } from '@js-camp/core/models/genre/genre';
import { GenreDto, GenrePaginationDto } from '@js-camp/core/dtos/genre-dto/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre/genre.mapper';
import { Pagination } from '@js-camp/core/models/pagintation';
import { DefaultParams } from '@js-camp/core/models/default-params';
import { DefaultParamsMapper } from '@js-camp/core/mappers/default-params.mapper';
import { StudioDTO, StudioPaginationDto } from '@js-camp/core/dtos/studios-dto/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio/studio.mapper';
import { Studio, StudioPagination } from '@js-camp/core/models/studio/studio';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class StudiosService {
	/** HTTP service. */
	private readonly httpService = inject(HttpClient);

	/** Url service. */
	private readonly urlService = inject(UrlService);

	/**
	 * Get anime from server.
	 * @param parameters Parameters of current request.
	 */
	public get(parameters: DefaultParams): Observable<Pagination<Studio>> {
		return this.httpService
			.get<StudioPaginationDto>(this.urlService.studiosUrls.studios, {
				params: new HttpParams({ fromObject: { ...DefaultParamsMapper.toDto(parameters) } }),
			})
			.pipe(
				map((studioPaginationDto) =>
					PaginationMapper.fromDto<StudioDTO, Studio>(studioPaginationDto, StudioMapper.fromDto)
				)
			);
	}

	public create(params: DefaultParams): Observable<Studio> {
		return this.httpService
			.post<StudioDTO>(this.urlService.studiosUrls.studios, { name: params.name })
			.pipe(map((studioDto) => StudioMapper.fromDto(studioDto)));
	}
}
