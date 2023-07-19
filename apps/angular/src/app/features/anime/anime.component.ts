import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../../core/services/anime.service';
import { Anime, AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, tap } from 'rxjs';

/** Anime Component */
@Component({
	selector: 'camp-anime',
	templateUrl: './anime.component.html',
	styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
	/** Status of anime getting from server. */
	isLoading$ = new BehaviorSubject<boolean>(true);

	/** List of animes. */
	animes: readonly Anime[] = [];

	/** Columns of table */
	displayedColumns: string[] = ['image', 'titleJapanese', 'titleEnglish', 'start aired', 'type', 'status'];

	constructor(private readonly animeService: AnimeService) {}

	ngOnInit(): void {
		this.animeService
			.getAnimes()
			.pipe(
				tap((animePagination) => {
					this.isLoading$.next(false);
				})
			)
			.subscribe((animeResponse) => {
				this.animes = animeResponse.results;
			});
	}
}
