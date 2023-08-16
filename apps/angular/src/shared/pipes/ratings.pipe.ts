import { Pipe, PipeTransform } from '@angular/core';
import { Rating, Ratings } from '@js-camp/core/models/rating';

/** Rating pipe. */
@Pipe({
	name: 'readableRating',
})
export class ReadableRatingPipe implements PipeTransform {
	/**
	 * Makes rating readable.
	 * @param value Rating.
	 */
	public transform(value: Ratings): string {
		return Rating.toReadable(value);
	}
}
