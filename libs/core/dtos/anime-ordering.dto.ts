/** Anime ordering DTO. */
export interface AnimeOrderingDto {

	/** Field. */
	readonly field: AnimeOrderingFieldDto;

	/** Direction. */
	readonly direction: OrderingDirectionDto;
}

/** Anime Ordering Field DTO. */
export enum AnimeOrderingFieldDto {
	TitleEnghlish = 'title_eng',
	Status = 'status',
	AiredStart = 'aired__startswith',
	None = '',
}

/** Anime Ordering Direction DTO. */
export enum OrderingDirectionDto {
	Ascending = '-',
	Descending = '',
	None = '',
}
