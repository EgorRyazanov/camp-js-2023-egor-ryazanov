import { Pipe, PipeTransform } from '@angular/core';
import { GenreMapper } from '@js-camp/core/mappers/genre/genre.mapper';
import { Genre } from '@js-camp/core/models/genre/genre';

/** Seasons pipe. */
@Pipe({
	name: 'readableGenres',
})
export class ReadableGenresPipe implements PipeTransform {
	/**
	 * Makes genres readable.
	 * @param value Array of genre.
	 */
	public transform(value: readonly Genre[]): string {
		return GenreMapper.toReadable(value);
	}
}
