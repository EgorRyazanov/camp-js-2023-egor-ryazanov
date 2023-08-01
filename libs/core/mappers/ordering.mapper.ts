import { OrderingDirection } from '../models/anime-ordering';

/** Ordering. */
export interface Ordering<Field> {

	/** Field. */
	readonly field: Field;

	/** Direction. */
	readonly direction: OrderingDirection;
}

/** Ordering mapper for field or direction. */
type OrderingMapper = Record<string, string>;

/** Ordering mapper. */
export namespace OrderingMapper {

	/**
	 * Converts ordering model to DTO.
	 * @param ordering Model.
	 * @param orderingFieldMapper Converts field model to DTO.
	 * @param orderingDirectionMapper Coverts direction model to DTO.
	 */
	export function toDto<OrderingField extends string>(
		ordering: Ordering<OrderingField> | undefined,
		orderingFieldMapper: OrderingMapper,
		orderingDirectionMapper: OrderingMapper,
	): string | undefined {
		if (ordering == null) {
			return undefined;
		}
		if (ordering?.field in orderingFieldMapper) {
			return `${orderingDirectionMapper[ordering.direction]}${orderingFieldMapper[ordering.field]}`;
		}
		return undefined;
	}
}
