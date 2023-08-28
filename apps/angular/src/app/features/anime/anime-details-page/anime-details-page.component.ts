import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { startLoadingStatus } from '@js-camp/angular/core/utils/loader-starter';
import { BehaviorSubject, Observable, catchError, filter, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { Rating } from '@js-camp/core/models/rating';
import { Season } from '@js-camp/core/models/season';
import { Source } from '@js-camp/core/models/anime/anime-source';
import { Studio } from '@js-camp/core/models/studio/studio';
import { Genre } from '@js-camp/core/models/genre/genre';
import { AppDialogService } from '@js-camp/angular/core/services/dialog.service';
import { AppError } from '@js-camp/core/models/app-error';

import { Anime } from '@js-camp/core/models/anime/anime';

import { ParamsService } from '@js-camp/angular/core/services/params.service';

import { ImageDialogComponent } from './components/dialog/image-dialog.component';

const homeUrl = '/animes';

/** Anime details page. */
@Component({
	selector: 'camp-anime-details-page',
	templateUrl: './anime-details-page.component.html',
	styleUrls: ['./anime-details-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ParamsService],
})
export class AnimeDetailsPageComponent {
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

	/** Anime. */
	protected readonly anime$: Observable<AnimeDetail>;

	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Custom dialog service. */
	private readonly appDialogService = inject(AppDialogService);

	private readonly animeDetailsService = inject(AnimeService);

	private readonly dialogService = inject(MatDialog);

	private readonly router = inject(Router);

	private readonly destroyRef = inject(DestroyRef);

	private readonly paramsService = inject(ParamsService);

	public constructor() {
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

	/**
	 * Makes studios readable.
	 * @param studios Array of studio.
	 */
	protected studiosToReadable(studios: readonly Studio[]): string {
		return studios.map(studio => studio.name).join(', ');
	}

	/**
	 * Makes genres readable.
	 * @param genres Array of genre.
	 */
	protected genresToReadable(genres: readonly Genre[]): string {
		return genres.map(genre => genre.name).join(', ');
	}

	/**
	 * Opens delete confirm dialog.
	 * @param id ID of anime to delete.
	 */
	protected openDeleteConfirmationDialog(id: Anime['id']): void {
		this.appDialogService
			.openConfirmDialog('Are you sure you want to delete this?')
			.afterClosed()
			.pipe(
				filter(result => result === true),
				switchMap(() => this.animeDetailsService.deleteAnime(id)),
				tap(() => {
					this.router.navigateByUrl(homeUrl);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	/** Creates anime stream. */
	private createAnimeStream(): Observable<AnimeDetail> {
		return this.paramsService.id$.pipe(
			startLoadingStatus(this.isLoading$),
			switchMap(id => this.animeDetailsService.getAnime(id)),
			catchError((error: unknown) => {
				if (error instanceof AppError) {
					this.appDialogService.openErrorDialog(error.message);
				}
				this.router.navigateByUrl(homeUrl);
				return throwError(() => error);
			}),
			stopLoadingStatus(this.isLoading$),
			takeUntilDestroyed(this.destroyRef),
		);
	}
}
