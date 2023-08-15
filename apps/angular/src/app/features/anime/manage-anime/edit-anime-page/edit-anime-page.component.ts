import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';

@Component({
	selector: 'camp-edit-anime-page',
	templateUrl: './edit-anime-page.component.html',
	styleUrls: ['./edit-anime-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAnimePageComponent {
	protected readonly isLoading$ = new BehaviorSubject(false);

	private readonly id$: Observable<string>;

	protected readonly anime$: Observable<AnimeDetail>;

	/** Anime details service. */
	private readonly animeService = inject(AnimeService);

	constructor() {
		this.id$ = this.createIdParamStream();
		this.anime$ = this.createAnimeStream();
	}

	/** Active route. */
	private readonly activeRoute = inject(ActivatedRoute);

	/** Creates id stream. */
	private createIdParamStream(): Observable<string> {
		return this.activeRoute.paramMap.pipe(map((params) => params.get('id') ?? ''));
	}

	ngOnInit(): void {
		this.createAnimeStream();
	}

	/** Creates anime stream. */
	private createAnimeStream(): Observable<AnimeDetail> {
		return this.id$.pipe(
			tap(() => {
				this.isLoading$.next(true);
			}),
			switchMap((id) => this.animeService.getAnime(id)),
			stopLoadingStatus(this.isLoading$)
		);
	}
}
