import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { startLoadingStatus } from '@js-camp/angular/core/utils/loader-starter';
import { ErrorDialogService } from '@js-camp/angular/core/services/error-dialog.service';
import { BehaviorSubject, Observable, catchError, map, switchMap, throwError } from 'rxjs';

import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { Rating } from '@js-camp/core/models/rating';
import { Season } from '@js-camp/core/models/season';
import { Source } from '@js-camp/core/models/anime/anime-source';
import { Studio } from '@js-camp/core/models/studio/studio';
import { Genre } from '@js-camp/core/models/genre/genre';

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

	private readonly errorDialogService = inject(ErrorDialogService);

	/** Router. */
	private readonly router = inject(Router);

	/** Anime status. */
	protected readonly animeStatus = AnimeStatus;

	/** Anime type. */
	protected readonly animeType = AnimeType;

	/** Rating. */
	protected readonly rating = Rating;

	/** Season. */
	protected readonly season = Season;

	/** Source. */
	protected readonly source = Source;

	public constructor() {
		this.id$ = this.createIdParamStream();
		this.anime$ = this.createAnimeStream();
	}

	/**
	 * Opens image dialog.
	 * @param imageUrl URL of image.
	 * @param titleEnglish English title.
	 */
	public openDialog(imageUrl: string | null, titleEnglish: string): void {
		if (imageUrl != null) {
			this.dialogService.open(ImageDialogComponent, {
				data: { imageUrl, titleEnglish },
			});
		}
	}

	/**
	 * Makes studios readable.
	 * @param studios Array of studio.
	 */
	protected studiosToReadable(studios: readonly Studio[]): string {
		return studios.map((studio) => studio.name).join(', ');
	}

	/**
	 * Makes genres readable.
	 * @param genres Array of genre.
	 */
	protected genresToReadable(genres: readonly Genre[]): string {
		return genres.map((genre) => genre.name).join(', ');
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
					this.errorDialogService.openDialog(error.message);
				}
				this.router.navigate([homeUrl]);
				return throwError(() => error);
			}),
			stopLoadingStatus(this.isLoading$)
		);
	}
}
