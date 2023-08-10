import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetailsService } from '@js-camp/angular/core/services/anime-details.service';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { BehaviorSubject, Observable, catchError, concatMap, map, of, switchMap, tap, throwError } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { ConfirmService } from '@js-camp/angular/core/services/confirm.service';

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
	private readonly animeDetailsService = inject(AnimeDetailsService);

	/** Sanitizer to make URL of video safe. */
	private readonly sanitizer = inject(DomSanitizer);

	/** Dialog service. */
	private readonly dialogService = inject(MatDialog);

	/** Confirmation service. */
	private readonly confirmationService = inject(ConfirmService);

	/** Router. */
	private readonly router = inject(Router);

	/** Active route. */
	private readonly activeRoute = inject(ActivatedRoute);

	public constructor() {
		this.id$ = this.createIdParamStream();
		this.anime$ = this.createAnimeStream();
	}

	/**
	 * Opens image dialog.
	 * @param imageUrl URL of image.
	 */
	protected openImageDialog(imageUrl: string | null): void {
		if (imageUrl != null) {
			this.dialogService.open(ImageDialogComponent, {
				data: { imageUrl },
			});
		}
	}

	/** Opens delete confirm dialog. */
	protected openDeleteConfirmationDialog(): void {
		this.confirmationService
			.openDialog('Are you sure you want to delete this?')
			.afterClosed()
			.pipe(
				concatMap((result) => {
					if (result) {
						return this.id$.pipe(
							switchMap((id) => this.animeDetailsService.deleteAnime(id)),
							tap(() => {
								this.router.navigate([homeUrl]);
							})
						);
					}
					return of(result);
				})
			)
			.subscribe();
	}

	protected navigateToEditPage() {
		return this.router.navigate([`${this.router.url}/edit`]);
	}

	/** Creates id stream. */
	private createIdParamStream(): Observable<string> {
		return this.activeRoute.paramMap.pipe(map((params) => params.get('id') ?? ''));
	}

	/**
	 * Creates anime stream.
	 * @param id ID of anime.
	 */
	private createAnimeStream(): Observable<AnimeDetail> {
		return this.id$.pipe(
			tap(() => {
				this.isLoading$.next(true);
			}),
			switchMap((id) => this.animeDetailsService.getAnime(id)),
			tap((animeDetail) => {
				if (animeDetail.trailerYoutubeUrl != null) {
					this.saveVideoUrl$.next(this.sanitizer.bypassSecurityTrustResourceUrl(animeDetail.trailerYoutubeUrl));
				}
			}),
			catchError((error: unknown) => {
				this.router.navigate([homeUrl]);
				return throwError(() => error);
			}),
			stopLoadingStatus(this.isLoading$)
		);
	}
}
