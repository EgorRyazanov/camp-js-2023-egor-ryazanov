/** Anime ordering DTO. */
export interface AnimeOrderingDto {

	/** Field. */
	readonly field: AnimeOrderingFieldDto;

	/** Direction. */
	readonly direction: AnimeOrderingDirectionDto;
}

/** Anime Ordering Field DTO. */
export enum AnimeOrderingFieldDto {
	TitleEnghlish = 'title_eng',
	Status = 'status',
	AiredStart = 'aired__startswith',
	None = '',
}

/** Anime Ordering Direction DTO. */
export enum AnimeOrderingDirectionDto {
	Ascending = '-',
	Descending = '',
	None = '',
}
