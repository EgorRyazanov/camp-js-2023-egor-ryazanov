import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../../core/services/anime.service';
import { Anime, AnimePagination } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Component({
	selector: 'camp-anime',
	templateUrl: './anime.component.html',
	styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
	isLoading$ = new BehaviorSubject<boolean>(true);
	animeResponse$ = new Observable<AnimePagination>();
	animes: readonly Anime[] = [];
	displayedColumns: string[] = ['image', 'titleJpn', 'titleEng', 'start aired', 'type', 'status'];

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
