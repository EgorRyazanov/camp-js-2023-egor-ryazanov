import { PaginationDto } from '../pagination.dto';

/** Studio DTO. */
export interface StudioDto {
	/** ID. */
	readonly id: number;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	readonly created: string;

	/**
	 * Modified date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	readonly modified: string;

	/** Name. */
	readonly name: string;
}

export type StudioPaginationDto = PaginationDto<StudioDto>;
