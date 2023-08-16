import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { startLoadingStatus } from '@js-camp/angular/core/utils/loader-starter';
import { BehaviorSubject, Observable, catchError, map, switchMap, throwError } from 'rxjs';

import { ImageDialogComponent } from './components/dialog/image-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

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
	private readonly id$: Observable<string>;

	/** Anime. */
	protected readonly anime$: Observable<AnimeDetail>;

	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Anime details service. */
	private readonly animeDetailsService = inject(AnimeService);

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
		return this.activeRoute.paramMap.pipe(map((params) => params.get('id') ?? ''));
	}

	/** Creates anime stream. */
	private createAnimeStream(): Observable<AnimeDetail> {
		return this.id$.pipe(
			startLoadingStatus(this.isLoading$),
			switchMap((id) => this.animeDetailsService.getAnime(id)),
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					alert(error.message);
				}
				this.router.navigate([homeUrl]);
				return throwError(() => error);
			}),
			stopLoadingStatus(this.isLoading$)
		);
	}
}
