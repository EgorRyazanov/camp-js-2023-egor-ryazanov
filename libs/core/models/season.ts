/** Seasons. */
export enum Seasons {
	Summer = 'Summer',
	Winter = 'Winter',
	Spring = 'Spring',
	Fall = 'Fall',
	NonSeasonal = 'NonSeasonal',
}

export namespace Season {
	const TO_TITLE_MAP: Record<Seasons, string> = {
		[Seasons.Fall]: 'Fail',
		[Seasons.NonSeasonal]: 'Non seasonal',
		[Seasons.Spring]: 'Spring',
		[Seasons.Summer]: 'Summer',
		[Seasons.Winter]: 'Winter',
	};

	export function toReadable(value: Seasons): string {
		return TO_TITLE_MAP[value];
	}
}
