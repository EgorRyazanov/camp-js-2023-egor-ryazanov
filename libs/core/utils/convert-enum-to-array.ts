export function convertEnumToArray<T extends Record<string, string | number>>(enumObject: T): (string | number)[] {
	return Object.values(enumObject);
}
