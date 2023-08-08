import { StudioDTO } from '../studios-dto/studio.dto';
import { GenreDto } from '../genre-dto/genre.dto';

import { AnimeDtoTypes, AnimeStatusDto } from './anime.dto';

export interface AnimeDetailDto {

	/** ID. */
	readonly id: number;

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
	readonly image: string;

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
	readonly trailer_youtube_id: string;

	/** Airing. */
	readonly airing: boolean;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios. */
	readonly studios_data: readonly StudioDTO[];

	/** Genres. */
	readonly genres_data: readonly GenreDto[];
}

/** Seasons DTO. */
export enum SeasonsDTO {
	Summer = 'SUMMER',
	Winter = 'WINTER',
	Spring = 'SPRING',
	Fall = 'FALL',
	NonSeasonal = 'NON_SEASONAL',
}

export enum SourceDTO {
	FourKomaManga = 'FOUR_KOMA_MANGA',
	Book = 'BOOK',
	CardGame = 'CARD_GAME',
	Game = 'GAME',
	LightNovel = 'LIGHT_NOVEL',
	Manga = 'MANGA',
	MixedMedia = 'MIXED_MEDIA',
	Music = 'MUSIC',
	Novel = 'NOVEL',
	Original = 'ORIGINAL',
	PictureBook = 'PICTURE_BOOK',
	Radio = 'RADIO',
	VisialNovel = 'VISUAL_NOVEL',
	WebManga = 'WEB_MANGA',
	WebNovel = 'WEB_NOVEL',
	Other = 'OTHER',
	Unknown = 'UNKNOWN',
}

/** Aired dates. */
export interface AiredDto {

	/**
	 *  Start date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	readonly start: string | null;

	/**
	 *  End date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	readonly end: string | null;
}

/** Rating. */
export enum RatingDto {
	G = 'G',
	PG = 'PG',
	PG_13 = 'PG_13',
	R_17 = 'R_17',
	R_PLUS = 'R_PLUS',
	R_X = 'R_X',
	Unknown = 'UNKNOWN',
}
