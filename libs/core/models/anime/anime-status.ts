/** Status. */
export enum AnimeStatuses {
	Finished = 'FINISHED',
	Airing = 'AIRING',
	NotYetAired = 'NOT_YET_AIRED',
}

/** Anime status. */
export namespace AnimeStatus {
	/** Anime status map-object to title view. */
	const TO_TITLE_MAP: Record<AnimeStatuses, string> = {
		[AnimeStatuses.Finished]: 'Finished',
		[AnimeStatuses.Airing]: 'Airing',
		[AnimeStatuses.NotYetAired]: 'Not yet aired',
	};

	/**
	 * Converts an anime status to readable title.
	 * @param value Anime status.
	 */
	export function toReadable(value: AnimeStatuses): string {
		return TO_TITLE_MAP[value];
	}
}
