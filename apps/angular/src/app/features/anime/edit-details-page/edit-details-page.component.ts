import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetailsService } from '@js-camp/angular/core/services/anime-details.service';
import { Observable, map } from 'rxjs';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';

@Component({
	selector: 'camp-edit-details-page',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './edit-details-page.component.html',
	styleUrls: ['./edit-details-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDetailsPageComponent {
	private readonly id$: Observable<string>;

	private readonly anime$: Observable<AnimeDetail>;
	/** Anime details service. */
	private readonly animeDetailsService = inject(AnimeDetailsService);

	/** Router. */
	private readonly router = inject(Router);

	/** Active route. */
	private readonly activeRoute = inject(ActivatedRoute);

	public constructor() {
		this.id$ = this.createIdParamStream();
	}
	/** Creates id stream. */
	private createIdParamStream(): Observable<string> {
		return this.activeRoute.paramMap.pipe(map((params) => params.get('id') ?? ''));
	}
}
