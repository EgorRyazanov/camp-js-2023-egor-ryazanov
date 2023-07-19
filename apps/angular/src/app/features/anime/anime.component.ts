import { Component, OnInit } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { BehaviorSubject, tap } from 'rxjs';

import { AnimeService } from '../../../core/services/anime.service';

/** Anime Component. */
@Component({
	selector: 'camp-anime',
	templateUrl: './anime.component.html',
	styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
	/** Status of anime getting from server. */
	public isLoading$ = new BehaviorSubject<boolean>(true);

	/** List of animes. */
	public animes: readonly Anime[] = [];

	/** Columns of table. */
	public readonly displayedColumns: string[] = [
		'image',
		'titleJapanese',
		'titleEnglish',
		'start aired',
		'type',
		'status',
	];

	public constructor(private readonly animeService: AnimeService) {}

	/** Initializes component. */
	public ngOnInit(): void {
		this.animeService
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
}
