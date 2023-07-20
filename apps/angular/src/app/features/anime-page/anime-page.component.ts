import { Component } from '@angular/core';
import { AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, debounceTime, shareReplay, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';

import { AnimeService } from '../../../core/services/anime.service';

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './anime-page.component.html',
	styleUrls: ['./anime-page.component.css'],
})
export class AnimePageComponent {
	/** Status of anime getting from server. */
	public isLoading$ = new BehaviorSubject<boolean>(false);

	/** Current page index. */
	public page$ = new BehaviorSubject<number>(0);

	/** Anime response. */
	public animeResponse$ = new Observable<AnimePagination>();

	/** Columns of table. */
	protected readonly displayedColumns: readonly string[] = [
		'image',
		'titleJapanese',
		'titleEnglish',
		'start aired',
		'type',
		'status',
	];

	public constructor(private readonly animeService: AnimeService) {
		this.animeResponse$ = this.createAnimesStream();
	}

	/** Creates stream to get animes from server. */
	public createAnimesStream(): Observable<AnimePagination> {
		return this.page$.pipe(
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(page => this.animeService.getAnimes(page)),
			tap(() => {
				this.isLoading$.next(false);
			}),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	/**
	 * Starts getting anime from server on pagination changes.
	 * @param pageEvent Page event.
	 */
	public getNextPage(pageEvent?: PageEvent): void {
		this.page$.next(pageEvent ? pageEvent.pageIndex * pageEvent.pageSize : 0);
	}
}
