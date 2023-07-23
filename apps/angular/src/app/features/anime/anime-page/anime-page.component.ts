import { Component } from '@angular/core';
import { AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, debounceTime, shareReplay, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { AnimeParameters } from '@js-camp/core/models/anime-params';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './anime-page.component.html',
	styleUrls: ['./anime-page.component.css'],
})
export class AnimePageComponent {
	/** Status of anime getting from server. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Current page index. */
	protected readonly page$ = new BehaviorSubject<number>(0);

	/** Anime response. */
	protected readonly response$: Observable<AnimePagination>;

	/** Limit page items. */
	private readonly limitPageItems = 25;

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
		this.response$ = this.createAnimesStream();
	}

	/** Creates stream to get animes from server. */
	private createAnimesStream(): Observable<AnimePagination> {
		return this.page$.pipe(
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap((page) =>
				this.animeService.getAnimes(
					new AnimeParameters({
						offset: page * this.limitPageItems,
						limit: this.limitPageItems,
					})
				)
			),
			tap(() => {
				this.isLoading$.next(false);
			}),
			shareReplay({ refCount: true, bufferSize: 1 })
		);
	}

	/**
	 * Starts getting anime from server on pagination changes.
	 * @param pageEvent Page event.
	 */
	protected setPage(pageEvent?: PageEvent): void {
		this.page$.next(pageEvent ? pageEvent.pageIndex * pageEvent.pageSize : 0);
	}

	/**
	 * Calculates total lenghts.
	 * @param animeCount Total anime count.
	 */
	public calculateTotalLenght(animeCount: number): number {
		return Math.ceil(animeCount / this.limitPageItems);
	}
}
