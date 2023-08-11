import { Pagination } from "../pagintation";

/** Genre. */
export class Genre {
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

	/** Name. */
	public readonly name: string;

	/** Type. */
	public readonly type: GenreTypes;

	public constructor(genreData: Genre) {
		this.id = genreData.id;
		this.created = genreData.created;
		this.modified = genreData.modified;
		this.name = genreData.name;
		this.type = genreData.type;
	}
}

/** Genre pagination. */
export type GenrePagination = Pagination<Genre>;

/** Genre types. */
export enum GenreTypes {
	Demographics = 'Demographics',
	ExplicitGenres = 'ExplicitGenres',
	Themes = 'Themes',
	Genres = 'Genres',
}
