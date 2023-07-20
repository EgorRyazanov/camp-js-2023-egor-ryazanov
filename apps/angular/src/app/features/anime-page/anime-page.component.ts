import { Component, OnInit, OnDestroy } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { BehaviorSubject, Subscription, debounceTime, switchMap, tap } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';

import { AnimeService } from '../../../core/services/anime.service';

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './anime-page.component.html',
	styleUrls: ['./anime-page.component.css'],
})
export class AnimePageComponent implements OnInit, OnDestroy {
	/** Status of anime getting from server. */
	public isLoading$ = new BehaviorSubject<boolean>(false);

	/** Current page index. */
	public page$ = new BehaviorSubject<number>(0);

	/** List of animes. */
	public animes: readonly Anime[] = [];

	/** Subscription to service to get anime. */
	public animeSubscription: Subscription | null = null;

	/** Columns of table. */
	protected readonly displayedColumns: readonly string[] = [
		'image',
		'titleJapanese',
		'titleEnglish',
		'start aired',
		'type',
		'status',
	];

	public constructor(private readonly animeService: AnimeService) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeSubscription = this.page$
			.pipe(
				tap(() => {
					this.isLoading$.next(true);
				}),
				debounceTime(500),
				switchMap(page => this.animeService.getAnimes(page)),
				tap(() => {
					this.isLoading$.next(false);
				}),
			)
			.subscribe(animeResponse => {
				this.animes = animeResponse.results;
			});
	}

	/**
	 * Starts getting anime from server on pagination changes.
	 * @param pageEvent Page event.
	 */
	public getNextPage(pageEvent?: PageEvent): void {
		this.page$.next(pageEvent ? pageEvent.pageIndex * pageEvent.pageSize : 0);
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.animeSubscription?.unsubscribe();
	}
}
