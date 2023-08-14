import { Pipe, PipeTransform } from '@angular/core';

/** Rating pipe. */
@Pipe({
	name: 'readableObject',
})
export class ReadableObject implements PipeTransform {
	/**
	 * Makes rating readable.
	 * @param value Rating.
	 */
	public transform(value: object, index: number): unknown {
		if ('name' in value) {
			return value.name;
		}

		return index;
	}
}
