import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Anime, AnimePagination, AnimeTypes, Ordering } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, combineLatestWith, debounceTime, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimeParameters } from '@js-camp/core/models/anime-params';
import { Sort, SortDirection } from '@angular/material/sort';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimeStatus } from '@js-camp/core/models/anime-status';

import { AnimeService } from '../../../../core/services/anime.service';

/** Routing query params. */
interface RoutingQueryParams {

	/** Page size. */
	size: number;

	/** Page number. */
	page: number;

	/** Filter type. */
	type: AnimeTypes[];

	/** Soring field. */
	field: string;

	/** Sorting direction. */
	direction: SortDirection;

	/** Search. */
	search: string;
}

/** Default routing query parameters. */
const defaultRoutingQueryParams: RoutingQueryParams = {
	size: 5,
	page: 0,
	type: [],
	field: '',
	direction: '',
	search: '',
};

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './animes-page.component.html',
	styleUrls: ['./animes-page.component.css'],
})
export class AnimesPageComponent implements OnInit {
	/** Destroy ref. */
	private readonly destroyRef = inject(DestroyRef);

	/** Anime service. */
	private readonly animeService = inject(AnimeService);

	/** Form builder. */
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Active route. */
	private readonly activeRoute = inject(ActivatedRoute);

	/** Router. */
	private readonly router = inject(Router);

	/** Page sizes. */
	protected readonly pageSizes: readonly number[] = [5, 10, 25];

	/** Query params. */
	// protected readonly queryParams = new BehaviorSubject<RoutingQueryParams>({ ...defaultRoutingQueryParams });
	protected readonly queryParams: RoutingQueryParams = { ...defaultRoutingQueryParams };

	/** Status of anime. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Current page index. */
	protected readonly pageNumber$ = new BehaviorSubject(defaultRoutingQueryParams.page);

	/** Current page size. */
	protected readonly pageSize$ = new BehaviorSubject(defaultRoutingQueryParams.size);

	/** Anime page. */
	protected readonly animePage$ = new Observable<AnimePagination>();

	/**	Sort parameter. */
	protected readonly sortParameter$ = new BehaviorSubject<Ordering>({
		field: defaultRoutingQueryParams.field,
		direction: defaultRoutingQueryParams.direction,
	});

	/** Search parameter. */
	protected readonly searchParameter$ = new BehaviorSubject(defaultRoutingQueryParams.search);

	/** Filter parameter. */
	protected readonly filterParameter$ = new BehaviorSubject(defaultRoutingQueryParams.type);

	/** Form values. */
	protected readonly form = this.formBuilder.group({
		search: [defaultRoutingQueryParams.search],
		filters: [defaultRoutingQueryParams.type],
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

	public constructor() {
		this.animePage$ = this.createAnimesStream();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.activeRoute.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(query => {
			const type = query['type'] instanceof Array ? query['type'] : [query['type']];
			this.form.controls.search.setValue(query['search']);
			this.form.controls.filters.setValue(type);

			this.queryParams.search = query['search'];
			this.queryParams.type = type;
			this.queryParams.page = query['page'];
			this.queryParams.size = query['size'];
			this.queryParams.field = query['field'];
			this.queryParams.direction = query['direction'];

			this.pageNumber$.next(query['page']);
			this.pageSize$.next(query['size']);
			this.sortParameter$.next({ field: query['field'], direction: query['direction'] });
			this.searchParameter$.next(query['search']);
			this.filterParameter$.next(query['type']);
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
			switchMap(([ordering, search, pageNumber, pageSize, filter]) =>
				this.animeService.getAnimes(
					new AnimeParameters({
						pageSize,
						pageNumber,
						ordering,
						search,
						typeIn: filter instanceof Array ? filter : [filter],
					}),
				)),
			tap(() => {
				this.isLoading$.next(false);
				window.scroll({ top: 0, behavior: 'smooth' });
			}),
		);
	}

	/** Sets query params. */
	protected setQueryParams(): void {
		this.router.navigate(['/'], { queryParams: this.queryParams });
	}

	/**
	 * Gets readable status of anime.
	 * @param status Anime status.
	 */
	protected getReadableStatus(status: AnimeStatus): string {
		return AnimeStatus.toReadable(status);
	}

	/**
	 * Tracks anime.
	 * @param _index Index.
	 * @param anime Anime.
	 */
	protected trackByAnime(_index: number, anime: Anime): number {
		return anime.id;
	}

	/**
	 * Changes sort parameter.
	 * @param event Event of sort fields.
	 */
	protected changeSortParameter(event: Sort): void {
		this.queryParams.field = event.direction ? event.active : defaultRoutingQueryParams.field;
		this.queryParams.direction = event.direction ?? defaultRoutingQueryParams.direction;
		this.setQueryParams();
	}

	/**
	 * Sets next page and size.
	 * @param pageEvent Page event.
	 */
	protected setPageParameter(pageEvent?: PageEvent): void {
		if (pageEvent) {
			this.queryParams.page = pageEvent.pageIndex;
			this.queryParams.size = pageEvent.pageSize;
			this.setQueryParams();
		}
	}

	/** Submit form action. */
	protected onSubmit(): void {
		this.queryParams.search = this.form.value.search ?? defaultRoutingQueryParams.search;
		this.queryParams.type = this.form.value.filters ?? defaultRoutingQueryParams.type;
		this.queryParams.page = defaultRoutingQueryParams.page;
		this.setQueryParams();
	}
}
