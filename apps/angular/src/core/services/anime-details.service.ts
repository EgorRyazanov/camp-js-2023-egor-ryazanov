import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AnimeDetailDto } from '@js-camp/core/dtos/anime-dto/anime-details.dto';
import { Observable, map } from 'rxjs';
import { AnimeDetailMapper } from '@js-camp/core/mappers/anime/anime-details.mapper';

import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';

import { UrlService } from './url.service';

/** Anime details service. */
@Injectable()
export class AnimeDetailsService {
	/** Http service. */
	private readonly httpService = inject(HttpClient);

	/** URL service. */
	private readonly urlService = inject(UrlService);

	/**
	 * Gets anime by ID.
	 * @param id ID of anime.
	 */
	public getAnime(id: string): Observable<AnimeDetail> {
		return this.httpService
			.get<AnimeDetailDto>(this.urlService.animeUrls.animesDetail(id))
			.pipe(map(dto => AnimeDetailMapper.fromDto(dto)));
	}
}
