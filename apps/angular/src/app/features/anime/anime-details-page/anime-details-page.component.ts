import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { startLoadingStatus } from '@js-camp/angular/core/utils/loader-starter';
import { BehaviorSubject, Observable, catchError, concatMap, map, of, switchMap, tap, throwError } from 'rxjs';

import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { Rating } from '@js-camp/core/models/rating';
import { Season } from '@js-camp/core/models/season';
import { Source } from '@js-camp/core/models/anime/anime-source';
import { Studio } from '@js-camp/core/models/studio/studio';
import { Genre } from '@js-camp/core/models/genre/genre';
import { DialogService } from '@js-camp/angular/core/services/dialog.service';
import { AppError } from '@js-camp/core/models/app-error';

import { ImageDialogComponent } from './components/dialog/image-dialog.component';

const homeUrl = '/animes';

/** Anime details page. */
@Component({
	selector: 'camp-anime-details-page',
	templateUrl: './anime-details-page.component.html',
	styleUrls: ['./anime-details-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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

	/** ID. */
	private readonly id$: Observable<string>;

	private readonly animeDetailsService = inject(AnimeService);

	private readonly dialogService = inject(MatDialog);

	private readonly activeRoute = inject(ActivatedRoute);

	/** Custom dialog service. */
	private readonly customDialogService = inject(DialogService);

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

	/** Opens delete confirm dialog. */
	protected openDeleteConfirmationDialog(): void {
		this.customDialogService
			.openConfirmDialog('Are you sure you want to delete this?')
			.afterClosed()
			.pipe(
				concatMap(result => {
					if (result) {
						return this.id$.pipe(
							switchMap(id => this.animeDetailsService.deleteAnime(id)),
							tap(() => {
								this.router.navigate([homeUrl]);
							}),
						);
					}
					return of(result);
				}),
			)
			.subscribe();
	}

	/** Navigates to edit page. */
	protected navigateToEditPage(): void {
		this.router.navigate([`${this.router.url}/edit`]);
	}

	/** Navigates to create page. */
	protected navigateToCreatePage(): void {
		this.router.navigate([`${homeUrl}/create`]);
	}

	/** Creates anime stream. */
	private createAnimeStream(): Observable<AnimeDetail> {
		return this.id$.pipe(
			startLoadingStatus(this.isLoading$),
			switchMap(id => this.animeDetailsService.getAnime(id)),
			catchError((error: unknown) => {
				if (error instanceof AppError) {
					this.customDialogService.openErrorDialog(error.message);
				}
				this.router.navigate([homeUrl]);
				return throwError(() => error);
			}),
			stopLoadingStatus(this.isLoading$),
		);
	}

	/** Creates ID stream. */
	private createIdParamStream(): Observable<string> {
		return this.activeRoute.paramMap.pipe(map(params => params.get('id') ?? ''));
	}
}
