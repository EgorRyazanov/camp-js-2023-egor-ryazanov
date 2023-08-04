import { OrderingDirectionDto } from '../ordering-direction.dto';

/** Anime ordering DTO. */
export interface AnimeOrderingDto {

	/** Field. */
	readonly field: AnimeOrderingFieldDto;

	/** Direction. */
	readonly direction: OrderingDirectionDto;
}

/** Anime Ordering Field DTO. */
export enum AnimeOrderingFieldDto {
	TitleEnghlish = 'title_eng',
	Status = 'status',
	AiredStart = 'aired__startswith',
	None = '',
}
