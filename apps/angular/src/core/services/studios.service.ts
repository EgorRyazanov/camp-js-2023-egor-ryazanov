import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { Pagination } from '@js-camp/core/models/pagintation';
import { DefaultParams } from '@js-camp/core/models/default-params';
import { DefaultParamsMapper } from '@js-camp/core/mappers/default-params.mapper';
import { StudioDto, StudioPaginationDto } from '@js-camp/core/dtos/studios-dto/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio/studio.mapper';
import { Studio } from '@js-camp/core/models/studio/studio';

import { UrlService } from './url.service';

/** Studios service. */
@Injectable({
	providedIn: 'root',
})
export class StudiosService {
	/** HTTP service. */
	private readonly httpService = inject(HttpClient);

	/** URL service. */
	private readonly urlService = inject(UrlService);

	/**
	 * Get studios from server.
	 * @param parameters Parameters of current request.
	 */
	public get(parameters: DefaultParams): Observable<Pagination<Studio>> {
		return this.httpService
			.get<StudioPaginationDto>(this.urlService.studiosUrls.studios, {
			params: new HttpParams({ fromObject: { ...DefaultParamsMapper.toDto(parameters) } }),
		})
			.pipe(
				map(studioPaginationDto =>
					PaginationMapper.fromDto<StudioDto, Studio>(studioPaginationDto, StudioMapper.fromDto)),
			);
	}

	/**
	 * Create studio.
	 * @param parameters Parameters of current request.
	 */
	public create(parameters: DefaultParams): Observable<Studio> {
		return this.httpService
			.post<StudioDto>(this.urlService.studiosUrls.studios, { name: parameters.name })
			.pipe(map(studioDto => StudioMapper.fromDto(studioDto)));
	}
}
