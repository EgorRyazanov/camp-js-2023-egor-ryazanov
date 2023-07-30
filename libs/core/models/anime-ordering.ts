/** Anime ordering. */
export class AnimeOrdering {
	/** Field. */
	private readonly field: AnimeOrderingField;

	/** Direction. */
	private readonly direction: AnimeOrderingDirection;

	public constructor(data: AnimeOrdering) {
		this.field = data.field;
		this.direction = data.direction;
	}
}

/** Anime Ordering Field. */
export enum AnimeOrderingField {
	TITLE_ENGLISH = 'titleEnglish',
	STATUS = 'status',
	AIRED_START = 'aired.start',
	NONE = '',
}

/** Anime Ordering Direction. */
export enum AnimeOrderingDirection {
	ASCENDING = 'asc',
	DESCENING = 'desc',
	NONE = '',
}
