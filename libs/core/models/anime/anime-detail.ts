import { Studio } from '../studio/studio';
import { Genre } from '../genre/genre';
import { Seasons } from '../season';
import { Ratings } from '../rating';

import { Sources } from './anime-source';
import { Anime } from './anime';

/** Anime Detail. */
export class AnimeDetail extends Anime {
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

	/** Studios. */
	public readonly studiosData: readonly Studio[];

	/** Genres. */
	public readonly genresData: readonly Genre[];

	public constructor(animeDetailData: AnimeDetail) {
		super({
			id: animeDetailData.id,
			aired: animeDetailData.aired,
			imageUrl: animeDetailData.imageUrl,
			status: animeDetailData.status,
			type: animeDetailData.type,
			titleEnglish: animeDetailData.titleEnglish,
			titleJapanese: animeDetailData.titleJapanese,
		});

		this.airing = animeDetailData.airing;
		this.created = animeDetailData.created;
		this.genresData = animeDetailData.genresData;
		this.modified = animeDetailData.modified;
		this.rating = animeDetailData.rating;
		this.season = animeDetailData.season;
		this.source = animeDetailData.source;
		this.studiosData = animeDetailData.studiosData;
		this.synopsis = animeDetailData.synopsis;
		this.trailerYoutubeUrl = animeDetailData.trailerYoutubeUrl;
	}
}

/** Aired dates. */
export interface Aired {

	/**
	 *  Start date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	readonly start: Date | null;

	/**
	 *  End date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	readonly end: Date | null;
}
