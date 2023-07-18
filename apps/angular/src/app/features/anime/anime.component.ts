import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../../core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

@Component({
	selector: 'camp-anime',
	templateUrl: './anime.component.html',
	styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
	animes: Anime[] = [];
	displayedColumns: string[] = ['image', 'titleJpn', 'titleEng', 'start aired', 'type', 'status'];

	constructor(private animeService: AnimeService) {}

	ngOnInit(): void {
		this.getAnimes();
	}

	getAnimes() {
		this.animeService.getAnimes().subscribe((animes) => {
			this.animes = animes;
			console.log(this.animes[0]);
		});
	}
}
