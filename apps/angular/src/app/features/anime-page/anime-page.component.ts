import { Component, OnInit } from '@angular/core';
import { AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, combineLatestWith, debounceTime, shareReplay, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME, LIMIT_ITEMS } from '@js-camp/angular/core/utils/constants';

import { AnimeParameters } from '@js-camp/core/models/anime-params';
import { Sort } from '@angular/material/sort';
import { Ordering, Type } from '@js-camp/core/utils/types';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimeService } from '../../../core/services/anime.service';

type QueryParameters = { [key in string]: unknown };

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './anime-page.component.html',
	styleUrls: ['./anime-page.component.css'],
})
export class AnimePageComponent implements OnInit {
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

	/** Filter parameter. */
	public filterParameter$ = new BehaviorSubject<Type[]>([]);

	/** Form values. */
	public form = this.fb.group({
		search: [''],
		filters: [[] as Type[]],
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
	/** filters. */
	protected readonly filters: readonly Type[] = [
		Type.TV,
		Type.OVA,
		Type.MOVIE,
		Type.SPECIAL,
		Type.ONA,
		Type.MUSIC,
		Type.UNKNOWN,
	];

	public constructor(
		private readonly animeService: AnimeService,
		private readonly fb: NonNullableFormBuilder,
		private readonly activeRoute: ActivatedRoute,
		private readonly router: Router
	) {
		this.animeResponse$ = this.createAnimesStream();
	}

	/**@inheritdoc */
	ngOnInit(): void {
		this.activeRoute.queryParams.subscribe((query) => {
			if ('search' in query) {
				this.form.controls.search.setValue(query['search']);
			}
			if ('type' in query) {
				this.form.controls.filters.setValue([...query['type']]);
			}
			this.filterParameter$.next(query['type'] ?? []);
			this.searchParameter$.next(query['search'] ?? '');
		});
	}

	/** Creates stream to get animes from server. */
	public createAnimesStream(): Observable<AnimePagination> {
		return this.sortParameter$.pipe(
			combineLatestWith(this.searchParameter$, this.page$, this.filterParameter$),
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(([ordering, search, page, filter]) => {
				console.log(filter);
				return this.animeService.getAnimes(
					new AnimeParameters({
						offset: page * LIMIT_ITEMS,
						limit: LIMIT_ITEMS,
						typeIn: filter,
						ordering,
						search,
					})
				);
			}),
			tap(() => {
				this.isLoading$.next(false);
				window.scroll({ top: 0, behavior: 'smooth' });
			}),
			shareReplay({ refCount: true, bufferSize: 1 })
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
		const queryParameters: QueryParameters = {};
		if (this.form.value.search) {
			queryParameters['search'] = this.form.value.search;
		}
		if (this.form.value.filters) {
			queryParameters['type'] = this.form.value.filters;
		}
		this.page$.next(0);
		this.router.navigate(['/'], { queryParams: queryParameters });
	}
}
