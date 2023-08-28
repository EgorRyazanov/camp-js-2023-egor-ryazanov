import { Genre } from '../genre/genre';
import { Rating } from '../rating';
import { Season } from '../season';
import { Studio } from '../studio/studio';

import { Aired } from '../aired';

import { Source } from './anime-source';
import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

/** Anime Detail. */
export interface AnimeDetailForm {

	/** English title. */
	readonly titleEnglish: string;

	/** Japanese title. */
	readonly titleJapanese: string;

	/** Aired dates. */
	readonly aired: Aired;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Rating. */
	readonly rating: Rating;

	/** Source. */
	readonly source: Source;

	/** Season. */
	readonly season: Season;

	/** Youtube trialer's ID. */
	readonly trailerYoutubeUrl: string | null;

	/** Airing. */
	readonly airing: boolean;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios. */
	readonly studios: readonly Studio[];

	/** Genres. */
	readonly genres: readonly Genre[];

	/** Image file. */
	readonly imageFile: File | null;

	/** Image URL. */
	readonly imageUrl: string | null;
}
