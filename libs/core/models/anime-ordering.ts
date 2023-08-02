/** Anime ordering. */
export class AnimeOrdering {
	/** Field. */
	private readonly field: AnimeOrderingField;

	/** Direction. */
	private readonly direction: OrderingDirection;

	public constructor(data: AnimeOrdering) {
		this.field = data.field;
		this.direction = data.direction;
	}
}

/** Anime Ordering Field. */
export enum AnimeOrderingField {
	TitleEnghlish = 'titleEnglish',
	Status = 'status',
	AiredStart = 'aired.start',
	None = '',
}

/** Ordering Direction. */
export enum OrderingDirection {
	Ascending = 'asc',
	Descending = 'desc',
	None = '',
}
