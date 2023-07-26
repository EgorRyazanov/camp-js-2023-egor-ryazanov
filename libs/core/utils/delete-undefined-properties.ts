/**
 * Deletes undefined properties.
 * @param obj Any object.
 */
export function deleteUndefinedProperties<T extends Object>(obj: T): T {
	const clone = { ...obj };
	for (const key in clone) {
		if (clone[key] === undefined) {
			delete clone[key];
		}
	}
	return clone;
}
