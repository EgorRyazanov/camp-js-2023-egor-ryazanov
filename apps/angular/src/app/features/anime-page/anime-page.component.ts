import { Component } from '@angular/core';
import { AnimePagination } from '@js-camp/core/models/anime';
import {
	BehaviorSubject,
	Observable,
	Subject,
	combineLatestWith,
	debounceTime,
	map,
	shareReplay,
	switchMap,
	tap,
} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME, LIMIT_ITEMS } from '@js-camp/angular/core/utils/constants';

import { AnimeService } from '../../../core/services/anime.service';
import { AnimeParameters } from '@js-camp/core/models/anime-params';
import { Sort } from '@angular/material/sort';

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

	/**	Sort parameter. */
	public sortParameter$ = new BehaviorSubject<string>('');

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
		return this.sortParameter$.pipe(
			combineLatestWith(this.page$),
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(([_, page]) =>
				this.animeService.getAnimes(new AnimeParameters({ offset: page * LIMIT_ITEMS, limit: LIMIT_ITEMS }))
			),
			tap(() => {
				this.isLoading$.next(false);
			}),
			shareReplay({ refCount: true, bufferSize: 1 })
		);
	}

	/**
	 * Changes sort parameter.
	 * @param event event of sort fields.
	 */
	public changeSortParameter(event: Sort): void {
		if (event.direction) {
			this.sortParameter$.next(event.direction === 'asc' ? `${event.active}` : `-${event.active}`);
		}
		this.sortParameter$.next('');
	}

	/**
	 * Starts getting anime from server on pagination changes.
	 * @param pageEvent Page event.
	 */
	public getNextPage(pageEvent?: PageEvent): void {
		this.page$.next(pageEvent ? pageEvent.pageIndex * pageEvent.pageSize : 0);
	}
}
