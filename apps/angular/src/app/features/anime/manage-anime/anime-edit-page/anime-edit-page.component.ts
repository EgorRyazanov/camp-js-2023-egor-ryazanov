import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { startLoadingStatus } from '@js-camp/angular/core/utils/loader-starter';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

/** Edit anime page. */
@Component({
	selector: 'camp-anime-edit-page',
	templateUrl: './anime-edit-page.component.html',
	styleUrls: ['./anime-edit-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditPageComponent {
	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Anime. */
	protected readonly anime$: Observable<AnimeDetail>;

	/** ID. */
	private readonly id$: Observable<string>;

	/** Anime details service. */
	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.id$ = this.activeRoute.paramMap.pipe(map(params => params.get('id') ?? ''));
		this.anime$ = this.createAnimeStream();
	}

	/** Active route. */
	private readonly activeRoute = inject(ActivatedRoute);

	/** Creates anime stream. */
	private createAnimeStream(): Observable<AnimeDetail> {
		return this.id$.pipe(
			startLoadingStatus(this.isLoading$),
			switchMap(id => this.animeService.getAnime(id)),
			stopLoadingStatus(this.isLoading$),
		);
	}
}
