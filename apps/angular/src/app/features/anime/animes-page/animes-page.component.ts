import { Component } from '@angular/core';
import { AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, combineLatestWith, debounceTime, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { AnimeParameters } from '@js-camp/core/models/anime-params';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime Component. */
@Component({
	selector: 'camp-animes-page',
	templateUrl: './animes-page.component.html',
	styleUrls: ['./animes-page.component.css'],
})
export class AnimesPageComponent {
	/** Status of anime. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Current page index. */
	protected readonly pageNumber$ = new BehaviorSubject(0);

	/** Page sizes. */
	protected readonly pageSizes: readonly number[] = [5, 10, 25];

	/** Current page size. */
	protected readonly pageSize$ = new BehaviorSubject(this.pageSizes[0]);

	/** Anime response. */
	protected readonly animePage$: Observable<AnimePagination>;

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
		this.animePage$ = this.createAnimesStream();
	}

	/** Stream of animes. */
	private createAnimesStream(): Observable<AnimePagination> {
		return this.pageNumber$.pipe(
			combineLatestWith(this.pageSize$),
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(([pageNumber, pageSize]) =>
				this.animeService.getAnimes(
					new AnimeParameters({
						pageSize,
						pageNumber,
					}),
				)),
			tap(() => {
				this.isLoading$.next(false);
			}),
		);
	}

	/**
	 * Sets next page.
	 * @param pageEvent Page event.
	 */
	protected setPage(pageEvent?: PageEvent): void {
		if (pageEvent) {
			this.pageNumber$.next(pageEvent.pageIndex);
			this.pageSize$.next(pageEvent.pageSize);
		} else {
			this.pageNumber$.next(0);
		}
	}
}
