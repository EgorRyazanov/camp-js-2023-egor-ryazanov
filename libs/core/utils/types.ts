/** Aired dates. */
export interface Aired {
	/**
	 *  Start date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	start: string | null;

	/**
	 *  End date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	end: string | null;
}

/** Ordering. */
export interface Ordering {
	/**
	 * Ordering direction.
	 * @example "asc", "desc", "none".
	 */
	direction: string;
	/** field name. */
	field: string;
}
