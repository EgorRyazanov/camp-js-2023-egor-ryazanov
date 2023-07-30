/** Anime ordering DTO. */
export interface AnimeOrderingDto {

	/** Field. */
	readonly field: AnimeOrderingFieldDto;

	/** Direction. */
	readonly direction: AnimeOrderingDirectionDto;
}

/** Anime Ordering Field DTO. */
export enum AnimeOrderingFieldDto {
	TITLE_ENGLISH = 'title_eng',
	STATUS = 'status',
	AIRED_START = 'aired__startswith',
	NONE = '',
}

/** Anime Ordering Direction DTO. */
export enum AnimeOrderingDirectionDto {
	ASCENDING = '-',
	DESCENING = '',
	NONE = '',
}
