/** Status. */
export enum AnimeStatus {
	Finished = 'FINISHED',
	Airing = 'AIRING',
	NotYetAired = 'NOT_YET_AIRED',
}

/** Anime status. */
export namespace AnimeStatus {

	/** Anime status map-object to title view. */
	const TO_TITLE_MAP: Record<AnimeStatus, string> = {
		[AnimeStatus.Finished]: 'Finished',
		[AnimeStatus.Airing]: 'Airing',
		[AnimeStatus.NotYetAired]: 'Not yet aired',
	};

	/**
	 * Converts an anime status to readable title.
	 * @param value Anime status.
	 */
	export function toReadable(value: AnimeStatus): string {
		return TO_TITLE_MAP[value];
	}
}
