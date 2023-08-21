import { Pipe, PipeTransform } from '@angular/core';

/** Empty pipe. */
@Pipe({
	name: 'empty',
})
export class EmptyPipe implements PipeTransform {
	/**
	 * Returns default message if value is empty.
	 * @param value Any value.
	 */
	public transform<T = unknown>(value: T): string | T {
		if (value === '' || value == null) {
			return 'Unknown';
		}

		if (value instanceof Array && value.length === 0) {
			return 'Unknown';
		}

		return value;
	}
}
