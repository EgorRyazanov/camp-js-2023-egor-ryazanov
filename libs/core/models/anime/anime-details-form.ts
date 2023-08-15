import { Seasons } from '../season';
import { Ratings } from '../rating';
import { AnimeStatuses } from './anime-status';
import { AnimeType } from './anime-type';
import { Sources } from './anime-source';
import { Aired } from './anime-detail';
import { Studio } from '../studio/studio';
import { Genre } from '../genre/genre';

/** Anime Detail. */
export class AnimeDetailForm {
	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	public readonly created: Date | null;

	/**
	 * Modified date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	public readonly modified: Date | null;

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

	/** Youtube trialer's ID. */
	public readonly trailerYoutubeUrl: string | null;

	/** Airing. */
	public readonly airing: boolean;

	/** Synopsis. */
	public readonly synopsis: string;

	/** Studios. */
	public readonly studios: readonly Studio[];

	/** Genres. */
	public readonly genres: readonly Genre[];

	public constructor(animeDetailData: AnimeDetailForm) {
		this.aired = animeDetailData.aired;
		this.airing = animeDetailData.airing;
		this.created = animeDetailData.created;
		this.image = animeDetailData.image;
		this.modified = animeDetailData.modified;
		this.rating = animeDetailData.rating;
		this.season = animeDetailData.season;
		this.source = animeDetailData.source;
		this.status = animeDetailData.status;
		this.synopsis = animeDetailData.synopsis;
		this.titleEnglish = animeDetailData.titleEnglish;
		this.titleJapanese = animeDetailData.titleJapanese;
		this.trailerYoutubeUrl = animeDetailData.trailerYoutubeUrl;
		this.type = animeDetailData.type;
		this.genres = animeDetailData.genres;
		this.studios = animeDetailData.studios;
	}
}
