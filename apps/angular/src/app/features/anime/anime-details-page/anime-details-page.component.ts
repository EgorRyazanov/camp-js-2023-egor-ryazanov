import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { BehaviorSubject, Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { ImageDialogComponent } from './components/dialog/image-dialog.component';

const homeUrl = '';

/** Anime details page. */
@Component({
	selector: 'camp-anime-details-page',
	templateUrl: './anime-details-page.component.html',
	styleUrls: ['./anime-details-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsPageComponent {
	/** ID. */
	protected readonly id$: Observable<string>;

	/** Anime. */
	protected readonly anime$: Observable<AnimeDetail>;

	/** Save video URL.  */
	protected readonly saveVideoUrl$ = new BehaviorSubject<SafeResourceUrl | null>(null);

	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Anime details service. */
	private readonly animeDetailsService = inject(AnimeService);

	/** Sanitizer to make URL of video safe. */
	private readonly sanitizer = inject(DomSanitizer);

	/** Dialog service. */
	private readonly dialogService = inject(MatDialog);

	/** Active route service. */
	private readonly activeRoute = inject(ActivatedRoute);

	/** Router. */
	private readonly router = inject(Router);

	public constructor() {
		this.id$ = this.createIdParamStream();
		this.anime$ = this.createAnimeStream();
	}

	/**
	 * Opens image dialog.
	 * @param imageUrl URL of image.
	 * @param titleEnglish English title.
	 */
	public openDialog(imageUrl: string, titleEnglish: string): void {
		this.dialogService.open(ImageDialogComponent, {
			data: { imageUrl, titleEnglish },
		});
	}

	/** Creates ID stream. */
	private createIdParamStream(): Observable<string> {
		return this.activeRoute.paramMap.pipe(map(params => params.get('id') ?? ''));
	}

	/** Creates anime stream. */
	private createAnimeStream(): Observable<AnimeDetail> {
		return this.id$.pipe(
			tap(() => {
				this.isLoading$.next(true);
			}),
			switchMap(id => this.animeDetailsService.getAnime(id)),
			tap(animeDetail => {
				if (animeDetail.trailerYoutubeUrl != null) {
					this.saveVideoUrl$.next(this.sanitizer.bypassSecurityTrustResourceUrl(animeDetail.trailerYoutubeUrl));
				}
			}),
			catchError((error: unknown) => {
				this.router.navigate([homeUrl]);
				return throwError(() => error);
			}),
			stopLoadingStatus(this.isLoading$),
		);
	}
}
