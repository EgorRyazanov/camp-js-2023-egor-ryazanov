import { Pipe, PipeTransform } from '@angular/core';
import { AnimeStatus, AnimeStatuses } from '@js-camp/core/models/anime/anime-status';

/** Anime status pipe. */
@Pipe({
	name: 'readableAnimeStatus',
})
export class ReadableAnimeStatus implements PipeTransform {
	/**
	 * Makes anime status readable.
	 * @param value Anime status.
	 */
	public transform(value: AnimeStatuses): string {
		return AnimeStatus.toReadable(value);
	}
}
