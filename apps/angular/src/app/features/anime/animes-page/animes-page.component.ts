import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Anime, AnimePagination, AnimeTypes } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, debounceTime, finalize, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimeParameters } from '@js-camp/core/models/anime-params';
import { Sort } from '@angular/material/sort';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { ParametersService } from '@js-camp/angular/core/services/parameters';
import { AnimeRoutingQueryParams, RoutingAnimeParamsMapper } from '@js-camp/angular/core/utils/routing-params.mapper';
import { AnimeOrderingDirection, AnimeOrderingField } from '@js-camp/core/models/anime-ordering';

import { AnimeService } from '../../../../core/services/anime.service';

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

	/** Params service. */
	private readonly paramsService: ParametersService<AnimeRoutingQueryParams>;

	/** Anime page. */
	protected readonly animePage$ = new Observable<AnimePagination>();

	/** Page sizes. */
	protected readonly pageSizes = RoutingAnimeParamsMapper.pageSizes;

	/** Params state. */
	protected paramsState = RoutingAnimeParamsMapper.defaultQueryParams;

	/** Flag to begin anime stream. */
	protected readonly hasToGetData$ = new BehaviorSubject<void>(undefined);

	/** Status of anime. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Form values. */
	protected readonly form = this.formBuilder.group({
		search: [RoutingAnimeParamsMapper.defaultQueryParams.search],
		filters: [RoutingAnimeParamsMapper.defaultQueryParams.type],
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
		this.paramsService = new ParametersService(this.paramsState, '/');
		this.animePage$ = this.createAnimesStream();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.activeRoute.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(query => {
			const { params, isChanged } = RoutingAnimeParamsMapper.toModal({
				search: query['search'],
				type: query['type'],
				pageNumber: query['pageNumber'],
				pageSize: query['pageSize'],
				field: query['field'],
				direction: query['direction'],
			});
			this.paramsState = params;
			this.form.controls.search.setValue(this.paramsState.search);
			this.form.controls.filters.setValue(this.paramsState.type);
			this.paramsService.changeParams(this.paramsState, isChanged);
			this.hasToGetData$.next();
		});
	}

	/** Stream of animes. */
	protected createAnimesStream(): Observable<AnimePagination> {
		return this.hasToGetData$.pipe(
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(() => {
				const params = this.paramsService.getParams();
				return this.animeService.getAnimes(
					new AnimeParameters({
						pageSize: params.pageSize,
						pageNumber: params.pageNumber,
						ordering: {
							field: params.field,
							direction: params.direction,
						},
						search: params.search,
						typeIn: params.type,
					}),
				);
			}),
			tap(() => {
				this.isLoading$.next(false);
				window.scroll({ top: 0, behavior: 'smooth' });
			}),
			finalize(() => {
				this.isLoading$.next(false);
			}),
		);
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
		const fieldState = RoutingAnimeParamsMapper.fieldToModal(event.active);
		const directionState = RoutingAnimeParamsMapper.directionToModal(event.direction);
		this.paramsService.changeParams({
			direction: directionState.direction,
			field: directionState.direction === AnimeOrderingDirection.NONE ? AnimeOrderingField.NONE : fieldState.field,
		});
	}

	/**
	 * Sets next page and size.
	 * @param pageEvent Page event.
	 */
	protected setPageParameter(pageEvent: PageEvent): void {
		const currentParams = this.paramsService.getParams();
		this.paramsService.changeParams({
			pageNumber: pageEvent.pageIndex ?? currentParams.pageNumber,
			pageSize: pageEvent.pageSize ?? currentParams.pageSize,
		});
	}

	/** Submit form action. */
	protected onSubmit(): void {
		this.paramsService.changeParams({
			search: this.form.value.search,
			type: this.form.value.filters,
			pageNumber: RoutingAnimeParamsMapper.defaultQueryParams.pageNumber,
		});
	}
}
