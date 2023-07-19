import { Aired, Type, Status } from '../utils/types';

import { PaginationDto } from './pagination.dto';

/** Anime DTO. */
export interface AnimeDto {

	/** Id. */
	readonly id: number;

	/** Created date. */
	readonly created: string;

	/** Modified date. */
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
