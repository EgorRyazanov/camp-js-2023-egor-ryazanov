/** Status. */
export enum AnimeStatus {
	FINISHED = 'FINISHED',
	AIRING = 'AIRING',
	NOT_YET_AIRED = 'NOT_YET_AIRED',
}

/** Anime status. */
export namespace AnimeStatus {

	/** Anime status map-object to title view. */
	const TO_TITLE_MAP: Record<AnimeStatus, string> = {
		[AnimeStatus.FINISHED]: 'Finished',
		[AnimeStatus.AIRING]: 'Airing',
		[AnimeStatus.NOT_YET_AIRED]: 'Not yet aired',
	};

	/**
	 * Converts an anime status to readable title.
	 * @param value Anime status.
	 */
	export function toReadable(value: AnimeStatus): string {
		return TO_TITLE_MAP[value];
	}
}
