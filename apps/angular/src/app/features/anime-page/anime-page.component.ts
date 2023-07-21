import { Component } from '@angular/core';
import { AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, combineLatestWith, debounceTime, shareReplay, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME, LIMIT_ITEMS } from '@js-camp/angular/core/utils/constants';

import { AnimeParameters } from '@js-camp/core/models/anime-params';
import { Sort } from '@angular/material/sort';
import { Ordering } from '@js-camp/core/utils/types';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
	public page$ = new BehaviorSubject(0);

	/** Anime response. */
	public animeResponse$ = new Observable<AnimePagination>();

	/**	Sort parameter. */
	public sortParameter$ = new BehaviorSubject<Ordering>({ field: 'none', direction: 'none' });

	/** Search parameter. */
	public searchParameter$ = new BehaviorSubject('');

	/** Form values. */
	public searchForm = this.fb.group({
		search: [''],
	});

	/** Columns of table. */
	protected readonly displayedColumns: readonly string[] = [
		'image',
		'titleJapanese',
		'titleEnglish',
		'start aired',
		'type',
		'status',
	];

	public constructor(
		private readonly animeService: AnimeService,
		private fb: FormBuilder,
		private activeRoute: ActivatedRoute,
		private router: Router,
	) {
		this.activeRoute.queryParams.subscribe(query => {
			if ('search' in query) {
				this.searchForm.controls.search.setValue(query['search']);
				this.searchParameter$.next(query['search']);
			}
		});
		this.animeResponse$ = this.createAnimesStream();
	}

	/** Creates stream to get animes from server. */
	public createAnimesStream(): Observable<AnimePagination> {
		return this.sortParameter$.pipe(
			combineLatestWith(this.searchParameter$),
			combineLatestWith(this.page$),
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(([[ordering, search], page]) =>
				this.animeService.getAnimes(
					new AnimeParameters({
						offset: page * LIMIT_ITEMS,
						limit: LIMIT_ITEMS,
						ordering,
						search,
					}),
				)),
			tap(() => {
				this.isLoading$.next(false);
			}),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	/**
	 * Changes sort parameter.
	 * @param event Event of sort fields.
	 */
	public changeSortParameter(event: Sort): void {
		this.sortParameter$.next({ field: event.active, direction: event.direction });
	}

	/**
	 * Starts getting anime from server on pagination changes.
	 * @param pageEvent Page event.
	 */
	public getNextPage(pageEvent?: PageEvent): void {
		this.page$.next(pageEvent ? pageEvent.pageIndex * pageEvent.pageSize : 0);
	}

	/** Submit form action. */
	public onSubmit(): void {
		if (this.searchForm.value.search) {
			this.router.navigate(['/'], { queryParams: { search: this.searchForm.value.search } });
		}
		this.searchParameter$.next('');
	}
}
