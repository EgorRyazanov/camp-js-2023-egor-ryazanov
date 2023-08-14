import { Pipe, PipeTransform } from '@angular/core';
import { StudioMapper } from '@js-camp/core/mappers/studio/studio.mapper';
import { Genre } from '@js-camp/core/models/genre/genre';
import { Studio } from '@js-camp/core/models/studio/studio';
import { AnimeType, AnimeTypes } from '@js-camp/core/models/anime/anime-type';
import { Source, Sources } from '@js-camp/core/models/anime/anime-source';
import { Rating, Ratings } from '@js-camp/core/models/rating';
import { Season, Seasons } from '@js-camp/core/models/season';
import { AnimeStatus, AnimeStatuses } from '@js-camp/core/models/anime/anime-status';
import { GenreMapper } from '@js-camp/core/mappers/genre/genre.mapper';
import { isType } from '@js-camp/core/utils/is-type';

/** Readable pipe. */
@Pipe({
	name: 'readable',
})
export class ReadablePipe implements PipeTransform {
	/**
	 * Checks value is studio array.
	 * @param type Value to check.
	 */
	private isStudioArrayType(type: readonly unknown[]): type is Studio[] {
		return type.reduce((acc: boolean, current: unknown) => acc && current instanceof Studio, true);
	}

	/**
	 * Checks value is genre array.
	 * @param type Value to check.
	 */
	private isGenresArrayType(type: readonly unknown[]): type is Genre[] {
		return type.reduce((acc: boolean, current: unknown) => acc && current instanceof Genre, true);
	}

	/**
	 * Checks value is anime type.
	 * @param type Value to check.
	 */
	private isAnimeType(type: string): type is AnimeType {
		return isType(type, AnimeType);
	}

	/**
	 * Checks value is source type.
	 * @param type Value to check.
	 */
	private isSourceType(type: string): type is Sources {
		return isType(type, Sources);
	}

	/**
	 * Checks value is rating type.
	 * @param type Value to check.
	 */
	private isRatingType(type: string): type is Ratings {
		return isType(type, Ratings);
	}

	/**
	 * Checks value is season type.
	 * @param type Value to check.
	 */
	private isSeasonType(type: string): type is Seasons {
		return isType(type, Seasons);
	}

	/**
	 * Checks value is anime status.
	 * @param type Value to check.
	 */
	private isAnimeStatusesType(type: string): type is AnimeStatuses {
		return isType(type, AnimeStatuses);
	}

	/**
	 * Makes unknown readable.
	 * @param value Value to transform.
	 */
	public transform(value: readonly unknown[] | string): readonly unknown[] | string {
		if (value instanceof Array) {
			if (this.isStudioArrayType(value)) {
				return StudioMapper.toReadable(value);
			} else if (this.isGenresArrayType(value)) {
				return GenreMapper.toReadable(value);
			}
		} else if (this.isAnimeStatusesType(value)) {
			return AnimeStatus.toReadable(value);
		} else if (this.isRatingType(value)) {
			return Rating.toReadable(value);
		} else if (this.isSourceType(value)) {
			return Source.toReadable(value);
		} else if (this.isSeasonType(value)) {
			return Season.toReadable(value);
		} else if (this.isAnimeType(value)) {
			return AnimeTypes.toReadable(value);
		}

		return value;
	}
}
