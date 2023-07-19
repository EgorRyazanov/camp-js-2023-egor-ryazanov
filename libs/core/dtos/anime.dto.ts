import { Aired, Type, Status } from '../utils/types';
import { PaginationDto } from './pagination.dto';

/** Anime DTO. */
export interface AnimeDto {
	/** Id. */
	id: number;
	/** Created date. */
	created: string;
	/** Modified date. */
	modified: string;
	/** English title */
	title_eng: string;
	/** Japanese title. */
	title_jpn: string;
	/** Image. */
	image: string;
	/** Aired dates. */
	aired: Aired;
	/** Type. */
	type: Type;
	/** Status. */
	status: Status;
	/** Score. */
	score: number | null;
	/** User score. */
	user_score: number | null;
}

/** Anime DTO with pagination fields. */
export type AnimePaginationDto = PaginationDto<AnimeDto>;
