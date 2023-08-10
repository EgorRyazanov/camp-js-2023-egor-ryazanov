import { Studio } from '../studio/studio';
import { Genre } from '../genre/genre';
import { Seasons } from '../season';
import { Ratings } from '../rating';
import { AnimeStatuses } from './anime-status';
import { AnimeType } from './anime-type';

import { Sources } from './anime-source';

/** Anime Detail. */
export class AnimeDetail {
	/** ID. */
	public readonly id: number;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	public readonly created: Date;

	/**
	 * Modified date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	public readonly modified: Date;

	/** English title. */
	public readonly titleEnglish: string;

	/** Japanese title. */
	public readonly titleJapanese: string;

	/** Image URL. */
	public readonly image: string | null;

	/** Aired dates. */
	public readonly aired: Aired;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatuses;

	/** Rating. */
	public readonly rating: Ratings;

	/** Source. */
	public readonly source: Sources;

	/** Season. */
	public readonly season: Seasons;

	/** Youtube trialer's URL. */
	public readonly trailerYoutubeUrl: string | null;

	/** Airing. */
	public readonly airing: boolean;

	/** Synopsis. */
	public readonly synopsis: string;

	/** Studios IDs. */
	public readonly studios: readonly number[];

	/** Studios. */
	public readonly studiosData: readonly Studio[];

	/** Genres IDs. */
	public readonly genres: readonly number[];

	/** Genres. */
	public readonly genresData: readonly Genre[];

	public constructor(animeDetailData: AnimeDetail) {
		this.id = animeDetailData.id;
		this.aired = animeDetailData.aired;
		this.airing = animeDetailData.airing;
		this.created = animeDetailData.created;
		this.genresData = animeDetailData.genresData;
		this.image = animeDetailData.image;
		this.modified = animeDetailData.modified;
		this.rating = animeDetailData.rating;
		this.season = animeDetailData.season;
		this.source = animeDetailData.source;
		this.status = animeDetailData.status;
		this.studiosData = animeDetailData.studiosData;
		this.synopsis = animeDetailData.synopsis;
		this.titleEnglish = animeDetailData.titleEnglish;
		this.titleJapanese = animeDetailData.titleJapanese;
		this.trailerYoutubeUrl = animeDetailData.trailerYoutubeUrl;
		this.type = animeDetailData.type;
		this.genres = animeDetailData.genres;
		this.studios = animeDetailData.studios;
	}
}

/** Aired dates. */
export interface Aired {
	/**
	 *  Start date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	start: Date | null;

	/**
	 *  End date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	end: Date | null;
}
