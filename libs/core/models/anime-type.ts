/** Anime type. */
export enum AnimeTypes {
	Tv = 'TV',
	Ova = 'OVA',
	Movie = 'MOVIE',
	Special = 'SPECIAL',
	Ona = 'ONA',
	Music = 'MUSIC',
	Unknown = 'UNKNOWN',
}

/** Anime types. */
export namespace AnimeTypes {

	/** Anime types map-object to title view. */
	const TO_TITLE_MAP: Record<AnimeTypes, string> = {
		[AnimeTypes.Movie]: 'Movie',
		[AnimeTypes.Music]: 'Music',
		[AnimeTypes.Ona]: 'Ona',
		[AnimeTypes.Ova]: 'Ova',
		[AnimeTypes.Special]: 'Special',
		[AnimeTypes.Tv]: 'Tv',
		[AnimeTypes.Unknown]: 'Unknown',
	};

	/**
	 * Converts an anime types to readable title.
	 * @param value Anime types.
	 */
	export function toReadable(value: AnimeTypes): string {
		return TO_TITLE_MAP[value];
	}
}
