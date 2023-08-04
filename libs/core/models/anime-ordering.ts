import { OrderingDirection } from './ordering-direction';

/** Anime ordering. */
export interface AnimeOrdering {

	/** Field. */
	readonly field: AnimeOrderingField;

	/** Direction. */
	readonly direction: OrderingDirection;
}

/** Anime Ordering Field. */
export enum AnimeOrderingField {
	TitleEnghlish = 'titleEnglish',
	Status = 'status',
	AiredStart = 'aired.start',
	None = '',
}
