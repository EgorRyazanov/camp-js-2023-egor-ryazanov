/** Anime type. */
export enum AnimeTypes {
	TV = 'TV',
	OVA = 'OVA',
	MOVIE = 'MOVIE',
	SPECIAL = 'SPECIAL',
	ONA = 'ONA',
	MUSIC = 'MUSIC',
	UNKNOWN = 'UNKNOWN',
}

/** Anime types. */
export namespace AnimeTypes {

	/** Anime types map-object to title view. */
	const TO_TITLE_MAP: Record<AnimeTypes, string> = {
		[AnimeTypes.MOVIE]: 'Movie',
		[AnimeTypes.MUSIC]: 'Music',
		[AnimeTypes.ONA]: 'Ona',
		[AnimeTypes.OVA]: 'Ova',
		[AnimeTypes.SPECIAL]: 'Special',
		[AnimeTypes.TV]: 'Tv',
		[AnimeTypes.UNKNOWN]: 'Unknown',
	};

	/**
	 * Converts an anime types to readable title.
	 * @param value Anime types.
	 */
	export function toReadable(value: AnimeTypes): string {
		return TO_TITLE_MAP[value];
	}
}
