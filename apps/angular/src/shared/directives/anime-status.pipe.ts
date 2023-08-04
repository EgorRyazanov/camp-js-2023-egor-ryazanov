import { Pipe, PipeTransform } from '@angular/core';
import { AnimeStatus } from '@js-camp/core/models/anime-status';

/** Anime status pipe. */
@Pipe({
	name: 'readableAnimeStatus',
})
export class ReadableAnimeStatus implements PipeTransform {
	/**
	 * Makes anime status readable.
	 * @param value Anime status.
	 */
	public transform(value: AnimeStatus): string {
		return AnimeStatus.toReadable(value);
	}
}
