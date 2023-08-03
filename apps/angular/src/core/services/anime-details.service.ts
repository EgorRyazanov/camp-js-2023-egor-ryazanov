import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AnimeDetailDto } from '@js-camp/core/dtos/anime-dto/anime-details.dto';
import { UrlService } from './url.service';
import { map } from 'rxjs';
import { AnimeDetailMapper } from '@js-camp/core/mappers/anime/anime-details.mapper';

@Injectable()
export class AnimeDetailsService {
	private readonly httpService = inject(HttpClient);

	private readonly urlService = inject(UrlService);

	public getAnime(id: string) {
		return this.httpService
			.get<AnimeDetailDto>(this.urlService.animeUrls.animesDetail(id))
			.pipe(map((dto) => AnimeDetailMapper.fromDto(dto)));
	}
}
