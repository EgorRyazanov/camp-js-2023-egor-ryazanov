import { enumToArray } from '../utils/enum-to-array';

/** Rating. */
export enum Rating {
	G = 'G',
	PG = 'PG',
	PG_13 = 'PG_13',
	R_17 = 'R_17',
	R_PLUS = 'R_PLUS',
	R_X = 'R_X',
	Unknown = 'Unknown',
}

/** Rating. */
export namespace Rating {
	const TO_TITLE_MAP: Record<Rating, string> = {
		[Rating.G]: 'G',
		[Rating.PG]: 'PG',
		[Rating.PG_13]: 'PG-17',
		[Rating.R_17]: 'R-17',
		[Rating.R_PLUS]: 'R-PLUS',
		[Rating.R_X]: 'R-X',
		[Rating.Unknown]: 'Unknown',
	};

	/** Converts rating enum to array. */
	export function toArray(): Rating[] {
		return enumToArray(Rating);
	}

	/**
	 * Makes rating readable.
	 * @param rating Rating.
	 */
	export function toReadable(rating: Rating): string {
		return TO_TITLE_MAP[rating];
	}
}
