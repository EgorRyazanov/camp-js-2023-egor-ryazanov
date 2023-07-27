import { Component, inject } from '@angular/core';
import { Anime, AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, debounceTime, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { AnimeParameters } from '@js-camp/core/models/anime-params';

import { AnimeStatus } from '@js-camp/core/models/anime-status';

import { AnimeService } from '../../../../core/services/anime.service';

/** Default pagination. */
interface DefaultPagination {

	/** Page number. */
	pageNumber: number;

	/** Page size. */
	pageSize: number;
}

const defaultPagination: DefaultPagination = {
	pageNumber: 0,
	pageSize: 5,
};

/** Anime Component. */
@Component({
	selector: 'camp-animes-page',
	templateUrl: './animes-page.component.html',
	styleUrls: ['./animes-page.component.css'],
})
export class AnimesPageComponent {
	/** Status of anime. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Page sizes. */
	protected readonly pageSizes: readonly number[] = [5, 10, 25];

	/** Anime page. */
	protected readonly animePage$: Observable<AnimePagination>;

	/** Pagination. */
	protected readonly pagination$ = new BehaviorSubject(defaultPagination);

	/** Columns of table. */
	protected readonly displayedColumns: readonly string[] = [
		'image',
		'titleJapanese',
		'titleEnglish',
		'start aired',
		'type',
		'status',
	];

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animePage$ = this.createAnimesStream();
	}

	/** Stream of animes. */
	private createAnimesStream(): Observable<AnimePagination> {
		return this.pagination$.pipe(
			tap(() => {
				this.isLoading$.next(true);
			}),
			debounceTime(DEBOUNCE_TIME),
			switchMap(pagination =>
				this.animeService.getAnimes(
					new AnimeParameters({
						pageSize: pagination.pageSize,
						pageNumber: pagination.pageNumber,
					}),
				)),
			tap(() => {
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
	protected trackByAnime(_index: number, anime: Anime): string {
		return anime.id.toString();
	}

	/**
	 * Sets next page.
	 * @param pageEvent Page event.
	 */
	protected setPage(pageEvent?: PageEvent): void {
		if (pageEvent) {
			this.pagination$.next({
				pageNumber: pageEvent.pageIndex,
				pageSize: pageEvent.pageSize,
			});
		} else {
			this.pagination$.next(defaultPagination);
		}
	}
}
