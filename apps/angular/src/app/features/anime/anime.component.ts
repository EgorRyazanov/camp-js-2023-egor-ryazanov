import { Component, OnInit, OnDestroy } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

import { AnimeService } from '../../../core/services/anime.service';

/** Anime Component. */
@Component({
	selector: 'camp-anime',
	templateUrl: './anime.component.html',
	styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit, OnDestroy {
	/** Status of anime getting from server. */
	public isLoading$ = new BehaviorSubject<boolean>(true);

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
		this.animeSubscription = this.animeService
			.getAnimes()
			.pipe(
				tap(() => {
					this.isLoading$.next(false);
				}),
			)
			.subscribe(animeResponse => {
				this.animes = animeResponse.results;
			});
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.animeSubscription?.unsubscribe();
	}
}
