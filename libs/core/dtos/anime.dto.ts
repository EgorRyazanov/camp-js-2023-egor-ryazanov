import { Aired, Type, Status } from '../utils/types';

import { PaginationDto } from './pagination.dto';

/** Anime DTO. */
export interface AnimeDto {
	/** ID. */
	readonly id: number;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	readonly created: string;

	/**
	 * Modified date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	readonly modified: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image. */
	readonly image: string;

	/** Aired dates. */
	readonly aired: Aired;

	/** Type. */
	readonly type: Type;

	/** Status. */
	readonly status: Status;

	/** Score. */
	readonly score: number | null;

	/** User score. */
	readonly user_score: number | null;
}

/** Anime DTO with pagination fields. */
export type AnimePaginationDto = PaginationDto<AnimeDto>;
