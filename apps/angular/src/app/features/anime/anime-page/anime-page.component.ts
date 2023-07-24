import { Component, OnInit } from '@angular/core';
import { AnimePagination, AnimeTypes } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, combineLatestWith, debounceTime, shareReplay, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';

import { AnimeParameters } from '@js-camp/core/models/anime-params';
import { Sort } from '@angular/material/sort';
import { Ordering } from '@js-camp/core/utils/types';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimeService } from '../../../../core/services/anime.service';
import { HttpParamsOptions } from '@angular/common/http';

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './anime-page.component.html',
	styleUrls: ['./anime-page.component.css'],
})
export class AnimePageComponent implements OnInit {
	/** Status of anime. */
	protected isLoading$ = new BehaviorSubject(false);

	/** Current page index. */
	protected pageNumber$ = new BehaviorSubject(0);

	/** Page sizes. */
	protected readonly pageSizes: readonly number[] = [5, 10, 25];

	/** Current page size. */
	protected readonly pageSize$ = new BehaviorSubject(this.pageSizes[0]);

	/** Anime response. */
	protected animePage$ = new Observable<AnimePagination>();

	/**	Sort parameter. */
	protected sortParameter$ = new BehaviorSubject<Ordering>({ field: 'none', direction: 'none' });

	/** Search parameter. */
	protected searchParameter$ = new BehaviorSubject('');

	/** Filter parameter. */
	protected filterParameter$ = new BehaviorSubject<AnimeTypes[]>([]);

	/** Form values. */
	protected form = this.fb.group({
		search: [''],
		filters: [[] as AnimeTypes[]],
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

	/** Filters. */
	protected readonly filters: readonly AnimeTypes[] = [
		AnimeTypes.TV,
		AnimeTypes.OVA,
		AnimeTypes.MOVIE,
		AnimeTypes.SPECIAL,
		AnimeTypes.ONA,
		AnimeTypes.MUSIC,
		AnimeTypes.UNKNOWN,
	];

	public constructor(
		private readonly animeService: AnimeService,
		private readonly fb: NonNullableFormBuilder,
		private readonly activeRoute: ActivatedRoute,
		private readonly router: Router
	) {
		this.animePage$ = this.createAnimesStream();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
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

	/** Stream of animes. */
	public createAnimesStream(): Observable<AnimePagination> {
		return this.sortParameter$.pipe(
			combineLatestWith(this.searchParameter$, this.pageNumber$, this.pageSize$, this.filterParameter$),
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(([ordering, search, pageNumber, pageSize, filter]) =>
				this.animeService.getAnimes(
					new AnimeParameters({
						pageSize,
						pageNumber,
						typeIn: filter,
						ordering,
						search,
					})
				)
			),
			tap(() => {
				this.isLoading$.next(false);
				window.scroll({ top: 0, behavior: 'smooth' });
			})
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
	 * Sets next page.
	 * @param pageEvent Page event.
	 */
	public setPage(pageEvent?: PageEvent): void {
		if (pageEvent) {
			this.pageSize$.next(pageEvent.pageIndex);
			this.pageSize$.next(pageEvent.pageIndex);
		} else {
			this.pageNumber$.next(0);
		}
	}

	/** Submit form action. */
	public onSubmit(): void {
		const queryParameters: HttpParamsOptions['fromObject'] = {};
		if (this.form.value.search) {
			queryParameters['search'] = this.form.value.search;
		}
		if (this.form.value.filters) {
			queryParameters['type'] = this.form.value.filters;
		}
		this.pageNumber$.next(0);
		this.router.navigate(['/'], { queryParams: queryParameters });
	}
}
