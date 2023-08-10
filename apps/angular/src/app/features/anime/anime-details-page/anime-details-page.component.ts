import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { ImageDialogComponent } from './components/dialog/image-dialog.component';

/** Anime details page. */
@Component({
	selector: 'camp-anime-details-page',
	templateUrl: './anime-details-page.component.html',
	styleUrls: ['./anime-details-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsPageComponent {
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
	private readonly activeRouteService = inject(ActivatedRoute);

	/** Destroy reference. */
	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		const id = this.activeRouteService.snapshot.paramMap.get('id') as string;
		this.anime$ = this.createAnimeStream(id);
	}

	/**
	 * Opens image dialog.
	 * @param imageUrl URL of image.
	 */
	public openDialog(imageUrl: string): void {
		this.dialogService.open(ImageDialogComponent, {
			data: { imageUrl },
		});
	}

	/**
	 * Creates anime stream.
	 * @param id ID of anime.
	 */
	private createAnimeStream(id: string): Observable<AnimeDetail> {
		this.isLoading$.next(true);
		return this.animeDetailsService.getAnime(id).pipe(
			tap(animeDetail => {
				if (animeDetail.trailerYoutubeUrl != null) {
					this.saveVideoUrl$.next(this.sanitizer.bypassSecurityTrustResourceUrl(animeDetail.trailerYoutubeUrl));
				}
			}),
			stopLoadingStatus(this.isLoading$),
			takeUntilDestroyed(this.destroyRef),
		);
	}
}
