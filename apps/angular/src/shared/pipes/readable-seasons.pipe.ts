import { Pipe, PipeTransform } from '@angular/core';
import { Seasons, Season } from '@js-camp/core/models/season';

/** Season pipe. */
@Pipe({
	name: 'readableSeason',
})
export class ReadableSeason implements PipeTransform {
	/**
	 * Makes seasons readable.
	 * @param value Season.
	 */
	public transform(value: Seasons): string {
		return Season.toReadable(value);
	}
}
