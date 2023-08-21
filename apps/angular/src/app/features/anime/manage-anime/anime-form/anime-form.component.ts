import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, of, switchMap, tap } from 'rxjs';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AnimeDetailForm } from '@js-camp/core/models/anime/anime-details-form';
import { ControlsOf } from '@js-camp/angular/core/utils/types/controls-of';
import { Rating } from '@js-camp/core/models/rating';
import { Season } from '@js-camp/core/models/season';
import { Source } from '@js-camp/core/models/anime/anime-source';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { Genre } from '@js-camp/core/models/genre/genre';
import { DefaultParams } from '@js-camp/core/models/default-params';
import { StudiosService } from '@js-camp/angular/core/services/studios.service';
import { Studio } from '@js-camp/core/models/studio/studio';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';

/** Anime Details Controls. */
type AnimeDetailControls = ControlsOf<AnimeDetailForm>;

/** Form actions. */
type FormAction = 'edit' | 'create';

/** Default form params. */
const DEFAULT_ANIME_DETAILS_FORM: AnimeDetailForm = {
	aired: {
		start: null,
		end: null,
	},
	airing: false,
	created: null,
	imageUrl: null,
	imageFile: null,
	modified: null,
	rating: Rating.Unknown,
	season: Season.NonSeasonal,
	source: Source.Unknown,
	status: AnimeStatus.NotYetAired,
	synopsis: '',
	titleEnglish: '',
	titleJapanese: '',
	trailerYoutubeUrl: null,
	type: AnimeType.Unknown,
	genres: [],
	studios: [],
};

/** Anime general form component. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent {
	/** Status of anime form loading. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Title. */
	private _title = 'Create anime';

	/** Sets title. */
	@Input()
	public set title(title: string) {
		this._title = title;
	}

	/** Gets title. */
	public get title(): string {
		return this._title;
	}

	/** Form action type. */
	private _formType: FormAction = 'create';

	/** Gets form values. */
	public get formType(): FormAction {
		return this._formType;
	}

	/** Gets form values. */
	@Input({ required: true })
	public set formType(type: FormAction) {
		this._formType = type;
	}

	/** Sets form values. */
	@Input()
	public set formValues(anime: AnimeDetail | null) {
		if (anime != null) {
			this.setFormValues(anime);
		}
	}

	/** Array of status. */
	protected readonly statusOptions = Object.values(AnimeStatus).slice(0, -1);

	/** Array of season. */
	protected readonly seasonOptions = Object.values(Season).slice(0, -1);

	/** Array of rating. */
	protected readonly ratingOptions = Object.values(Rating).slice(0, -1);

	/** Array of types. */
	protected readonly typesOptions = Object.values(AnimeType).slice(0, -1);

	/** Array of source. */
	protected readonly sourcesOptions = Object.values(Source).slice(0, -1);

	/** Form. */
	protected readonly form: FormGroup<AnimeDetailControls>;

	/** Current pagination genres. */
	protected readonly genres$ = new BehaviorSubject<readonly Genre[] | null>(null);

	/** Added genre by user. */
	protected readonly addedGenre$ = new BehaviorSubject<Genre | null>(null);

	/** Current pagination studios. */
	protected readonly studios$ = new BehaviorSubject<readonly Studio[] | null>(null);

	/** Added studio. */
	protected readonly addedStudio$ = new BehaviorSubject<Studio | null>(null);

	private readonly animeService = inject(AnimeService);

	private readonly genresService = inject(GenresService);

	private readonly studiosService = inject(StudiosService);

	private readonly router = inject(Router);

	private readonly cdr = inject(ChangeDetectorRef);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly activeRoute = inject(ActivatedRoute);

	public constructor() {
		this.form = this.initAnimeDetailsForm();
	}

	/** Handle submit. */
	protected onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.invalid) {
			return;
		}
		const { id } = this.activeRoute.snapshot.params;
		this.isLoading$.next(true);
		const action$ =
			this.formType === 'create' ?
				this.animeService.createAnime(this.form.getRawValue()) :
				this.animeService.changeAnime(id, this.form.getRawValue());
		action$
			.pipe(
				first(),
				tap(anime => {
					this.router.navigate([`animes/${anime.id}`]);
				}),
				stopLoadingStatus(this.isLoading$),
				catchFormErrors(this.form),
			)
			.subscribe({
				error: () => {
					this.cdr.markForCheck();
				},
			});
	}

	/**
	 * Gets new studios when scrolling.
	 * @param params Pagination params.
	 */
	protected getStudios(params: DefaultParams): void {
		this.studiosService
			.get(params)
			.pipe(
				first(),
				map(pagination => pagination?.items),
				tap(studios => {
					if (studios.length > 0) {
						this.studios$.next(studios);
					} else {
						this.studios$.next(null);
					}
				}),
			)
			.subscribe();
	}

	/**
	 * Creates new studio.
	 * @param params Pagination params.
	 */
	protected createStudios(params: DefaultParams): void {
		this.studiosService
			.get(params)
			.pipe(
				first(),
				switchMap(studios => {
					if (studios.count !== 0) {
						return of(studios.items[0]);
					}

					return this.studiosService.create({ name: params.name, pageNumber: params.pageNumber });
				}),
			)
			.subscribe(studio => {
				this.addedStudio$.next(studio);
			});
	}

	/**
	 * Gets new genres when scrolling.
	 * @param params Pagination params.
	 */
	protected getGenres(params: DefaultParams): void {
		this.genresService
			.get(params)
			.pipe(
				first(),
				map(pagination => pagination?.items),
				tap(genres => {
					if (genres.length > 0) {
						this.genres$.next(genres);
					} else {
						this.genres$.next(null);
					}
				}),
			)
			.subscribe();
	}

	/**
	 * Creates new genre.
	 * @param params Pagination params.
	 */
	protected createGenres(params: DefaultParams): void {
		this.genresService
			.get(params)
			.pipe(
				first(),
				switchMap(genres => {
					if (genres.count !== 0) {
						return of(genres.items[0]);
					}

					return this.genresService.create({ name: params.name, pageNumber: params.pageNumber });
				}),
			)
			.subscribe(genre => {
				this.addedGenre$.next(genre);
			});
	}

	/**
	 * Sets form values.
	 * @param animeDetail Form values.
	 */
	private setFormValues(animeDetail: AnimeDetail): void {
		this.form.patchValue({
			...animeDetail,
			imageUrl: animeDetail.imageUrl,
		});
	}

	/** Initialize form. */
	private initAnimeDetailsForm(): FormGroup<AnimeDetailControls> {
		return this.formBuilder.group<AnimeDetailControls>({
			synopsis: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.synopsis, [Validators.required]),
			titleEnglish: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.titleEnglish, [Validators.required]),
			aired: this.formBuilder.group({
				start: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.aired.start),
				end: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.aired.end),
			}),
			imageUrl: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.imageUrl),
			imageFile: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.imageFile),
			airing: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.airing, [Validators.required]),
			rating: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.rating, [Validators.required]),
			genres: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.genres, [Validators.required]),
			created: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.created),
			modified: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.modified),
			season: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.season, [Validators.required]),
			source: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.source, [Validators.required]),
			status: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.status, [Validators.required]),
			studios: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.studios, [Validators.required]),
			titleJapanese: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.titleJapanese, [Validators.required]),
			trailerYoutubeUrl: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.trailerYoutubeUrl),
			type: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.type, [Validators.required]),
		});
	}
}
