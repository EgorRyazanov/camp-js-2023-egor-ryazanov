import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AppDialogService } from '@js-camp/angular/core/services/dialog.service';
import { ParamsService } from '@js-camp/angular/core/services/params.service';
import { startLoadingStatus } from '@js-camp/angular/core/utils/loader-starter';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { AppError } from '@js-camp/core/models/app-error';
import { BehaviorSubject, Observable, catchError, switchMap } from 'rxjs';

const homeUrl = '/animes';

/** Edit anime page. */
@Component({
	selector: 'camp-anime-edit-page',
	templateUrl: './anime-edit-page.component.html',
	styleUrls: ['./anime-edit-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ParamsService],
})
export class AnimeEditPageComponent {
	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Anime. */
	protected readonly anime$: Observable<AnimeDetail>;

	private readonly animeService = inject(AnimeService);

	private readonly router = inject(Router);

	private readonly paramsService = inject(ParamsService);

	private readonly appDialogService = inject(AppDialogService);

	public constructor() {
		this.anime$ = this.createAnimeStream();
	}

	/** Creates anime stream. */
	private createAnimeStream(): Observable<AnimeDetail> {
		return this.paramsService.id$.pipe(
			startLoadingStatus(this.isLoading$),
			switchMap(id => this.animeService.getAnime(id)),
			stopLoadingStatus(this.isLoading$),
			catchError((error: unknown) => {
				if (error instanceof AppError) {
					this.appDialogService.openErrorDialog(error.message);
				}
				this.router.navigateByUrl(homeUrl);
				throw error;
			}),
		);
	}
}
