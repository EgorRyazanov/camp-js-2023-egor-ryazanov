import { enumToArray } from '../utils/enum-to-array';

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

	/** Converts season enum to array. */
	export function toArray(): Season[] {
		return enumToArray(Season);
	}

	/**
	 * Makes season readable.
	 * @param season Season.
	 */
	export function toReadable(season: Season): string | null {
		return TO_TITLE_MAP[season];
	}
}
