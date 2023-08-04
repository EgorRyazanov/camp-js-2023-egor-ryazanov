import { Studio } from '../studio/studio';

import { Genre } from '../genre/genre';

import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

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
	public readonly image: string;

	/** Aired dates. */
	public readonly aired: Aired;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Rating. */
	public readonly rating: Rating;

	/** Source. */
	public readonly source: Source;

	/** Season. */
	public readonly season: Seasons;

	/** Youtube trialer's URL. */
	public readonly trailerYoutubeUrl: string | null;

	/** Airing. */
	public readonly airing: boolean;

	/** Synopsis. */
	public readonly synopsis: string;

	/** Studios. */
	public readonly studiosData: readonly Studio[];

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
	}
}

/** Seasons DTO. */
export enum Seasons {
	Summer = 'Summer',
	Winter = 'Winter',
	Spring = 'Spring',
	Fall = 'Fall',
	NonSeasonal = 'NonSeasonal',
}

/** Anime Source. */
export enum Source {
	FourKomaManga = 'FourKomaManga',
	Book = 'Book',
	CardGame = 'CardGame',
	Game = 'Game',
	LightNovel = 'LightNovel',
	Manga = 'Manga',
	MixedMedia = 'MixedMedia',
	Music = 'Music',
	Novel = 'Novel',
	Original = 'Original',
	PictureBook = 'PictureBook',
	Radio = 'Radio',
	VisialNovel = 'VisualNovel',
	WebManga = 'WebManga',
	WebNovel = 'WebNovel',
	Other = 'Other',
	Unknown = 'Unknown',
}

/** Rating. */
export enum Rating {
	G = 'G',
	PG = 'PG',
	PG_13 = 'PG_13',
	R_17 = 'R_17',
	R_PLUS = 'R_PLUS',
	R_X = 'R_X',
	Unknown = 'UNKNOWN',
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
