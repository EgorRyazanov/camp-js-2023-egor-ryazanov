import { Component, inject } from '@angular/core';
import { Anime, AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, catchError, debounceTime, map, switchMap, tap, throwError } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { AnimeParameters } from '@js-camp/core/models/anime-params';
import { Sort } from '@angular/material/sort';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
	AnimeRoutingQueryParams,
	Changed,
	RoutingAnimeParamsMapper,
	UnknownAnimeRouringQueryParams,
} from '@js-camp/angular/core/utils/routing-params.mapper';
import { OrderingDirection, AnimeOrderingField } from '@js-camp/core/models/anime-ordering';
import { AnimeTypes } from '@js-camp/core/models/anime-type';

import { AnimeService } from '../../../../core/services/anime.service';

type ProccessQueries = Changed & { params: AnimeRoutingQueryParams; };

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './animes-page.component.html',
	styleUrls: ['./animes-page.component.css'],
})
export class AnimesPageComponent {
	/** Router. */
	private readonly router = inject(Router);

	/** Anime service. */
	private readonly animeService = inject(AnimeService);

	/** Form builder. */
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Active route. */
	private readonly activeRoute = inject(ActivatedRoute);

	/** Anime page. */
	protected readonly animePage$ = new Observable<AnimePagination>();

	/** Page sizes. */
	protected readonly pageSizes = RoutingAnimeParamsMapper.pageSizes;

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
		this.animePage$ = this.createAnimesStream();
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
		const fieldState = RoutingAnimeParamsMapper.fieldToModel(event.active);
		const directionState = RoutingAnimeParamsMapper.directionToModel(event.direction);
		this.setQueryParams({
			direction: directionState.direction,
			field: directionState.direction === OrderingDirection.NONE ? AnimeOrderingField.NONE : fieldState.field,
		});
	}

	/**
	 * Sets next page and size.
	 * @param pageEvent Page event.
	 */
	protected setPageParameter(pageEvent: PageEvent): void {
		const currentParams = this.getQueryParams();
		this.setQueryParams({
			pageNumber: pageEvent.pageIndex ?? currentParams[`pageNumber`],
			pageSize: pageEvent.pageSize ?? currentParams[`pageSize`],
		});
	}

	/** Submit form action. Sets page and size parameters. */
	protected setPaginationParameters(): void {
		this.setQueryParams({
			search: this.form.value.search,
			type: this.form.value.filters,
			pageNumber: RoutingAnimeParamsMapper.defaultQueryParams.pageNumber,
		});
	}

	/** Gets query params. */
	public getQueryParams(): Params {
		return this.activeRoute.snapshot.queryParams;
	}

	/**
	 * Sets query params.
	 * @param params Changed params.
	 */
	private setQueryParams(params: Partial<UnknownAnimeRouringQueryParams>): void {
		const currentParams = this.getQueryParams();
		this.router.navigate(['/'], { queryParams: { ...currentParams, ...params } });
	}

	/** Stream of animes. */
	private createAnimesStream(): Observable<AnimePagination> {
		return this.activeRoute.queryParams.pipe(
			map(query => {
				const { params, isChanged } = this.proccessQueries(query);
				if (isChanged) {
					this.setQueryParams(params);
				}
				this.form.controls.search.setValue(params.search);
				this.form.controls.filters.setValue(params.type);
				return params;
			}),
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(params => this.animeService.getAnimes(new AnimeParameters(this.prepareAnimeParams(params)))),
			tap(() => {
				this.isLoading$.next(false);
				window.scroll({ top: 0, behavior: 'smooth' });
			}),
			catchError((error: unknown) => {
				this.isLoading$.next(false);
				return throwError(() => error);
			}),
		);
	}

	/**
	 * Converts queries to anime routing query parameters.
	 * @param query Qyery parameters.
	 */
	private proccessQueries(query: Params): ProccessQueries {
		const changedQueryParams = RoutingAnimeParamsMapper.toModel({
			search: query['search'],
			type: query['type'],
			pageNumber: query['pageNumber'],
			pageSize: query['pageSize'],
			field: query['field'],
			direction: query['direction'],
		});
		const { isChanged: _, ...params } = changedQueryParams;
		return {
			params,
			isChanged: changedQueryParams.isChanged,
		};
	}

	/**
	 * Converts AnimeRoutingQueryParams to AnimeParameters.
	 * @param params Anime routing query params.
	 */
	private prepareAnimeParams(params: AnimeRoutingQueryParams): AnimeParameters {
		return {
			pageSize: params.pageSize,
			pageNumber: params.pageNumber,
			ordering: {
				field: params.field,
				direction: params.direction,
			},
			search: params.search,
			typeIn: params.type,
		};
	}
}
