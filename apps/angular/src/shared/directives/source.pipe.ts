import { Pipe, PipeTransform } from '@angular/core';
import { Source, Sources } from '@js-camp/core/models/anime/anime-source';

/**Source pipe. */
@Pipe({
	name: 'readableSource',
})
export class ReadableSource implements PipeTransform {
	/**
	 * Makes source readable.
	 * @param value source.
	 */
	public transform(source: Sources): string {
		return Source.toReadable(source);
	}
}
