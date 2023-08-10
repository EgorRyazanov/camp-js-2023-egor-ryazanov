import { AnimeDtoTypes, AnimeStatusDto } from './anime.dto';
import { AiredDto, RatingDto, SeasonsDTO, SourceDTO } from './anime-details.dto';

/** Anime detail form DTO. */
export interface AnimeDetailFormDto {
	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	readonly created: string;

	/**
	 * Modified date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	readonly modified: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image URL. */
	readonly image: string | null;

	/** Aired dates. */
	readonly aired: AiredDto;

	/** Type. */
	readonly type: AnimeDtoTypes;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Rating. */
	readonly rating: RatingDto;

	/** Source. */
	readonly source: SourceDTO;

	/** Season. */
	readonly season: SeasonsDTO;

	/** Youtube trialer's ID. */
	readonly trailer_youtube_id: string | null;

	/** Airing. */
	readonly airing: boolean;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios IDs. */
	readonly studios: readonly number[];

	/** Genres IDs. */
	readonly genres: readonly number[];
}
