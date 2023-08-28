import { PaginationDto } from '../pagination.dto';

/** Genre DTO. */
export interface GenreDto {

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

	/** Name. */
	readonly name: string;

	/** Type. */
	readonly type: GenreTypesDto;
}

export type GenrePaginationDto = PaginationDto<GenreDto>;

/** Genre types DTO. */
export enum GenreTypesDto {
	Demographics = 'DEMOGRAPHICS',
	ExplicitGenres = 'EXPLICIT_GENRES',
	Themes = 'THEMES',
	Genres = 'GENRES',
}
