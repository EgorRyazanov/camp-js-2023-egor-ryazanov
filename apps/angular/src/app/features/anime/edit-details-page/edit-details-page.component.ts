import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, first, map, of, switchMap, tap } from 'rxjs';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AnimeDetailForm } from '@js-camp/core/models/anime/anime-details-form';
import { ControlsOf } from '@js-camp/angular/core/utils/types/controls-of';
import { Ratings } from '@js-camp/core/models/rating';
import { Seasons } from '@js-camp/core/models/season';
import { Sources } from '@js-camp/core/models/anime/anime-source';
import { AnimeStatuses } from '@js-camp/core/models/anime/anime-status';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { convertEnumToArray } from '@js-camp/core/utils/convert-enum-to-array';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { Genre } from '@js-camp/core/models/genre/genre';

type AnimeDetailControls = ControlsOf<AnimeDetailForm>;

type DefaultParams = {
	name?: string;
	pageNumber: number;
	search?: string;
	pageSize?: number;
};

const DEFAULT_ANIME_DETAILS_FORM: AnimeDetailForm = {
	aired: {
		start: null,
		end: null,
	},
	airing: false,
	created: null,
	image: null,
	modified: null,
	rating: Ratings.Unknown,
	season: Seasons.NonSeasonal,
	source: Sources.Unknown,
	status: AnimeStatuses.NotYetAired,
	synopsis: '',
	titleEnglish: '',
	titleJapanese: '',
	trailerYoutubeUrl: null,
	type: AnimeType.Unknown,
	genresData: [],
	studiosData: [],
};

@Component({
	selector: 'camp-edit-details-page',
	templateUrl: './edit-details-page.component.html',
	styleUrls: ['./edit-details-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDetailsPageComponent implements OnInit {
	protected readonly genresService = inject(GenresService);
	private readonly id$: Observable<string>;

	protected readonly isLoading$ = new BehaviorSubject(false);

	protected readonly statuses = convertEnumToArray(AnimeStatuses) as AnimeStatuses[];

	protected readonly seasons = convertEnumToArray(Seasons) as Seasons[];

	protected readonly ratings = convertEnumToArray(Ratings) as Ratings[];

	protected readonly types = convertEnumToArray(AnimeType) as AnimeType[];

	protected readonly sources = convertEnumToArray(Sources) as Sources[];
	/** Save video URL.  */
	protected readonly saveVideoUrl$ = new BehaviorSubject<SafeResourceUrl | null>(null);

	protected readonly form: FormGroup<AnimeDetailControls>;

	/** Anime details service. */
	private readonly animeDetailsService = inject(AnimeService);

	/** Sanitizer to make URL of video safe. */
	private readonly sanitizer = inject(DomSanitizer);

	/** Router. */
	private readonly router = inject(Router);

	/** Active route. */
	private readonly activeRoute = inject(ActivatedRoute);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	protected genres$ = new BehaviorSubject<readonly Genre[] | null>(null);

	protected addedGenre$ = new BehaviorSubject<Genre | null>(null);

	public constructor() {
		this.form = this.initAnimeDetailsForm();
		this.id$ = this.createIdParamStream();
	}

	ngOnInit(): void {
		this.createAnimeStream();
	}

	protected onSubmit() {
		console.log(this.form.controls.genresData.invalid);
	}

	/** Creates id stream. */
	private createIdParamStream(): Observable<string> {
		return this.activeRoute.paramMap.pipe(map((params) => params.get('id') ?? ''));
	}

	/** Creates anime stream. */
	private createAnimeStream(): void {
		this.id$
			.pipe(
				tap(() => {
					this.isLoading$.next(true);
				}),
				switchMap((id) => this.animeDetailsService.getAnime(id)),
				tap((animeDetail) => {
					this.setFormValues(animeDetail);
				}),
				tap((animeDetail) => {
					if (animeDetail.trailerYoutubeUrl != null) {
						this.saveVideoUrl$.next(this.sanitizer.bypassSecurityTrustResourceUrl(animeDetail.trailerYoutubeUrl));
					}
				}),
				stopLoadingStatus(this.isLoading$)
			)
			.subscribe();
	}

	private setFormValues(animeDetail: AnimeDetail): void {
		this.form.patchValue({ ...animeDetail });
	}

	protected getGenres(params: DefaultParams): void {
		this.genresService
			.get(params)
			.pipe(
				first(),
				map((pagination) => pagination?.items),
				tap((genres) => {
					if (genres.length > 0) {
						this.genres$.next(genres);
					} else {
						this.genres$.next(null);
					}
				})
			)
			.subscribe();
	}

	protected createGenres(params: DefaultParams): void {
		this.genresService
			.get(params)
			.pipe(
				first(),
				switchMap((genres) => {
					if (genres.count !== 0) {
						of(genres.items[0]);
					}

					return this.genresService.create({ name: params.name, pageNumber: params.pageNumber });
				})
			)
			.subscribe((genre) => {
				this.addedGenre$.next(genre);
			});
	}

	private initAnimeDetailsForm(): FormGroup<AnimeDetailControls> {
		return this.formBuilder.group<AnimeDetailControls>({
			synopsis: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.synopsis),
			titleEnglish: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.titleEnglish),
			aired: this.formBuilder.group({
				start: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.aired.start),
				end: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.aired.end),
			}),
			airing: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.airing),
			rating: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.rating),
			genresData: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.genresData, [Validators.required]),
			image: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.image),
			created: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.created),
			modified: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.modified),
			season: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.season),
			source: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.source),
			status: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.status),
			studiosData: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.studiosData),
			titleJapanese: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.titleJapanese),
			trailerYoutubeUrl: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.trailerYoutubeUrl),
			type: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.type),
		});
	}
}
