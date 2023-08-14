/** Aired dates. */
export interface AiredDto {

	/**
	 *  Start date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	readonly start: string | null;

	/**
	 *  End date.
	 *  @example 1975-01-01T00:00:00Z.
	 */
	readonly end: string | null;
}
