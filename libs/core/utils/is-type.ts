/**
 * Checks that value contains in enum.
 * @param value Value to check.
 * @param validatingEnum Inspector.
 */
export function isType<T extends string>(value: T, validatingEnum: Record<string, string | number>): boolean {
	return Object.values(validatingEnum).includes(value);
}
