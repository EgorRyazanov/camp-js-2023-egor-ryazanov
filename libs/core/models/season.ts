/** Seasons. */
export enum Season {
	Summer = 'Summer',
	Winter = 'Winter',
	Spring = 'Spring',
	Fall = 'Fall',
	NonSeasonal = 'NonSeasonal',
}

/** Season. */
export namespace Season {
	const TO_TITLE_MAP: Record<Season, string> = {
		[Season.Fall]: 'Fail',
		[Season.NonSeasonal]: 'Non seasonal',
		[Season.Spring]: 'Spring',
		[Season.Summer]: 'Summer',
		[Season.Winter]: 'Winter',
	};

	/**
	 * Makes season readable.
	 * @param season Season.
	 */
	export function toReadable(season: Season | null): string | null {
		if (season != null) {
			return TO_TITLE_MAP[season];
		}

		return null;
	}
}
