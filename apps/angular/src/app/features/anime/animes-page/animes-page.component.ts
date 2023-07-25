import { Component, OnInit } from '@angular/core';
import { AnimePagination, AnimeTypes, Ordering } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, combineLatestWith, debounceTime, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';

import { AnimeParameters } from '@js-camp/core/models/anime-params';
import { Sort, SortDirection } from '@angular/material/sort';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './animes-page.component.html',
	styleUrls: ['./animes-page.component.css'],
})
export class AnimesPageComponent implements OnInit {
	/** Status of anime. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Current page index. */
	protected readonly pageNumber$ = new BehaviorSubject(0);

	/** Page sizes. */
	protected readonly pageSizes: readonly number[] = [5, 10, 25];

	/** Current page size. */
	protected readonly pageSize$ = new BehaviorSubject(this.pageSizes[0]);

	/** Anime page. */
	protected readonly animePage$ = new Observable<AnimePagination>();

	/**	Sort parameter. */
	protected readonly sortParameter$ = new BehaviorSubject<Ordering>({ field: 'none', direction: 'none' });

	/** Search parameter. */
	protected readonly searchParameter$ = new BehaviorSubject('');

	/** Filter parameter. */
	protected readonly filterParameter$ = new BehaviorSubject<AnimeTypes[]>([]);

	protected readonly queryParams = {
		size: this.pageSizes[0],
		page: 0,
		type: [] as AnimeTypes[],
		field: '',
		direction: '' as SortDirection,
		search: '',
	};

	/** Form values. */
	protected readonly form = this.fb.group({
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
				this.queryParams['search'] = query['search'];
			}
			if ('type' in query) {
				this.form.controls.filters.setValue([...query['type']]);
				this.queryParams['type'] = query['type'];
			}
			if ('page' in query) {
				this.pageNumber$.next(query['page']);
				this.queryParams['page'] = query['page'];
			}
			if ('size' in query) {
				this.pageSize$.next(query['size']);
				this.queryParams['size'] = query['size'];
			}
			if ('field' in query && 'direction' in query) {
				this.sortParameter$.next({ field: query['field'], direction: query['direction'] });
				this.queryParams['field'] = query['field'];
				this.queryParams['direction'] = query['direction'];
			}
			this.filterParameter$.next(query['type'] ?? []);
			this.searchParameter$.next(query['search'] ?? '');
		});
	}

	/** Stream of animes. */
	protected createAnimesStream(): Observable<AnimePagination> {
		return this.sortParameter$.pipe(
			combineLatestWith(this.searchParameter$, this.pageNumber$, this.pageSize$, this.filterParameter$),
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(([ordering, search, pageNumber, pageSize, filter]) => {
				return this.animeService.getAnimes(
					new AnimeParameters({
						pageSize,
						pageNumber,
						ordering,
						search,
						typeIn: filter instanceof Array ? filter : [filter],
					})
				);
			}),
			tap(() => {
				this.isLoading$.next(false);
				window.scroll({ top: 0, behavior: 'smooth' });
			})
		);
	}

	protected setQueryParams() {
		this.router.navigate(['/'], { queryParams: this.queryParams });
	}

	/**
	 * Changes sort parameter.
	 * @param event Event of sort fields.
	 */
	protected changeSortParameter(event: Sort): void {
		this.sortParameter$.next({ field: event.active, direction: event.direction });
		this.queryParams['field'] = event.active ?? '';
		this.queryParams['direction'] = event.direction ?? ('' as SortDirection);
		this.setQueryParams();
	}

	/**
	 * Sets next page.
	 * @param pageEvent Page event.
	 */
	protected setPage(pageEvent?: PageEvent): void {
		if (pageEvent) {
			this.pageNumber$.next(pageEvent.pageIndex);
			this.pageSize$.next(pageEvent.pageSize);
			this.queryParams['page'] = pageEvent.pageIndex;
			this.queryParams['size'] = pageEvent.pageSize;
			this.setQueryParams();
		}
	}

	/** Submit form action. */
	protected onSubmit(): void {
		if (this.form.value.search) {
			this.queryParams['search'] = this.form.value.search;
		}
		if (this.form.value.filters) {
			this.queryParams['type'] = this.form.value.filters;
		}
		this.pageNumber$.next(0);
		this.setQueryParams();
	}
}
