import { Pipe, PipeTransform } from '@angular/core';

/** Yes or no pipe. */
@Pipe({
	name: 'yesOrNo',
})
export class YesNoPipe implements PipeTransform {
	/**
	 * Converts boolean to yes or no.
	 * @param value Boolean type value.
	 */
	public transform(value: boolean): 'Yes' | 'No' {
		return value ? 'Yes' : 'No';
	}
}
