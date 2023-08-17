/** Anime type. */
export enum AnimeType {
	Tv = 'Tv',
	Ova = 'Ova',
	Movie = 'Movie',
	Special = 'Special',
	Ona = 'Ona',
	Music = 'Music',
	Unknown = 'Unknown',
}

/** Anime types. */
export namespace AnimeType {

	/** Anime types map-object to title view. */
	const TO_TITLE_MAP: Record<AnimeType, string> = {
		[AnimeType.Movie]: 'Movie',
		[AnimeType.Music]: 'Music',
		[AnimeType.Ona]: 'Ona',
		[AnimeType.Ova]: 'Ova',
		[AnimeType.Special]: 'Special',
		[AnimeType.Tv]: 'Tv',
		[AnimeType.Unknown]: 'Unknown',
	};

	/**
	 * Converts an anime types to readable title.
	 * @param value Anime types.
	 */
	export function toReadable(value: AnimeType | null): string | null {
		if (value != null) {
			return TO_TITLE_MAP[value];
		}

		return null;
	}
}
