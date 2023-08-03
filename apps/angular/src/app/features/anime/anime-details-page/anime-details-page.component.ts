import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetailsService } from '@js-camp/angular/core/services/anime-details.service';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { ImageDialog } from './components/dialog/image-dialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'camp-anime-details-page',
	templateUrl: './anime-details-page.component.html',
	styleUrls: ['./anime-details-page.component.css'],
})
export class AnimeDetailsPageComponent {
	private readonly destroyRef = inject(DestroyRef);

	private readonly activeRouteService = inject(ActivatedRoute);

	private readonly animeDetailsService = inject(AnimeDetailsService);

	private readonly sanitizer = inject(DomSanitizer);

	protected readonly dialogService = inject(MatDialog);

	protected readonly anime$ = new Subject<AnimeDetail>();

	protected readonly saveVideoUrl$ = new BehaviorSubject<SafeResourceUrl | null>(null);

	protected readonly isLoading$ = new BehaviorSubject(false);

	constructor() {
		const id = this.activeRouteService.snapshot.paramMap.get('id') as string;
		this.isLoading$.next(true);
		this.animeDetailsService
			.getAnime(id)
			.pipe(
				tap(() => {
					this.isLoading$.next(false);
				}),
				catchError((error) => {
					this.isLoading$.next(false);
					return throwError(() => error);
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe((animeDetail) => {
				this.anime$.next(animeDetail);
				if (animeDetail.trailerYoutubeUrl != null) {
					this.saveVideoUrl$.next(this.sanitizer.bypassSecurityTrustResourceUrl(animeDetail.trailerYoutubeUrl));
				}
			});
	}

	public openDialog(imageUrl: string): void {
		this.dialogService.open(ImageDialog, {
			data: { imageUrl },
		});
	}
}
