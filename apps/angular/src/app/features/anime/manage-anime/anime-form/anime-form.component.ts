import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, of, switchMap, tap } from 'rxjs';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AnimeDetailForm } from '@js-camp/core/models/anime/anime-details-form';
import { ControlsOf } from '@js-camp/angular/core/utils/types/controls-of';
import { Ratings } from '@js-camp/core/models/rating';
import { Seasons } from '@js-camp/core/models/season';
import { Sources } from '@js-camp/core/models/anime/anime-source';
import { AnimeStatuses } from '@js-camp/core/models/anime/anime-status';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { convertEnumToArray } from '@js-camp/core/utils/convert-enum-to-array';
import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { Genre } from '@js-camp/core/models/genre/genre';
import { DefaultParams } from '@js-camp/core/models/default-params';
import { StudiosService } from '@js-camp/angular/core/services/studios.service';
import { Studio } from '@js-camp/core/models/studio/studio';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

type AnimeDetailControls = ControlsOf<AnimeDetailForm>;

type FormAction = 'edit' | 'create';

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
	genres: [],
	studios: [],
};

@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent {
	private _type: FormAction = 'create';

	private _title: string = 'Create anime';

	public get type() {
		return this._type;
	}

	@Input()
	public set title(title: string) {
		this._title = title;
	}

	public get title() {
		return this._title;
	}

	@Input({ required: true })
	public set type(type: FormAction) {
		this._type = type;
	}

	@Input()
	public set formValues(anime: AnimeDetail | null) {
		if (anime != null) {
			this.setFormValues(anime);
		}
	}

	protected readonly statuses = convertEnumToArray(AnimeStatuses) as AnimeStatuses[];

	protected readonly seasons = convertEnumToArray(Seasons) as Seasons[];

	protected readonly ratings = convertEnumToArray(Ratings) as Ratings[];

	protected readonly types = convertEnumToArray(AnimeType) as AnimeType[];

	protected readonly sources = convertEnumToArray(Sources) as Sources[];

	protected readonly form: FormGroup<AnimeDetailControls>;
	/** Router. */

	protected genres$ = new BehaviorSubject<readonly Genre[] | null>(null);

	protected addedGenre$ = new BehaviorSubject<Genre | null>(null);

	protected studios$ = new BehaviorSubject<readonly Studio[] | null>(null);

	protected addedStudio$ = new BehaviorSubject<Studio | null>(null);

	private readonly animeService = inject(AnimeService);

	private readonly genresService = inject(GenresService);

	private readonly studiosService = inject(StudiosService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Active route. */
	private readonly activeRoute = inject(ActivatedRoute);

	public constructor() {
		this.form = this.initAnimeDetailsForm();
	}

	protected onSubmit() {
		if (this.form.invalid) {
			return;
		}

		if (this.type === 'create') {
			console.log(123);
			this.animeService
				.createAnime(this.form.getRawValue())
				.pipe(
					first(),
					tap((anime) => {
						this.router.navigate([`animes/${anime.id}`]);
					})
				)
				.subscribe();
		} else {
			const id = this.activeRoute.snapshot.params['id'];
			this.animeService
				.changeAnime(id, this.form.getRawValue())
				.pipe(
					first(),
					tap((anime) => {
						this.router.navigate([`animes/${anime.id}`]);
					})
				)
				.subscribe();
		}
	}

	protected getStudios(params: DefaultParams): void {
		this.studiosService
			.get(params)
			.pipe(
				first(),
				map((pagination) => pagination?.items),
				tap((studios) => {
					if (studios.length > 0) {
						this.studios$.next(studios);
					} else {
						this.studios$.next(null);
					}
				})
			)
			.subscribe();
	}

	protected createStudios(params: DefaultParams): void {
		this.studiosService
			.get(params)
			.pipe(
				first(),
				switchMap((studios) => {
					if (studios.count !== 0) {
						of(studios.items[0]);
					}

					return this.studiosService.create({ name: params.name, pageNumber: params.pageNumber });
				})
			)
			.subscribe((studio) => {
				this.addedStudio$.next(studio);
			});
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

	private setFormValues(animeDetail: AnimeDetail): void {
		this.form.patchValue({ ...animeDetail });
	}

	private initAnimeDetailsForm(): FormGroup<AnimeDetailControls> {
		return this.formBuilder.group<AnimeDetailControls>({
			synopsis: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.synopsis, [Validators.required]),
			titleEnglish: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.titleEnglish, [Validators.required]),
			aired: this.formBuilder.group({
				start: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.aired.start),
				end: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.aired.end),
			}),
			airing: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.airing, [Validators.required]),
			rating: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.rating, [Validators.required]),
			genres: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.genres, [Validators.required]),
			image: this.formBuilder.control(DEFAULT_ANIME_DETAILS_FORM.image),
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
