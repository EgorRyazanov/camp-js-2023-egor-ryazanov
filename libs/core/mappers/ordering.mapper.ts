/** Ordering. */
export interface Ordering<Field, Direction> {

	/** Field. */
	readonly field: Field;

	/** Direction. */
	readonly direction: Direction;
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
	export function toDto<Field extends string, Direction extends string>(
		ordering: Ordering<Field, Direction> | undefined,
		orderingFieldMapper: OrderingMapper,
		orderingDirectionMapper: OrderingMapper,
	): string | undefined {
		if (!ordering) {
			return undefined;
		}
		if (ordering?.field in orderingFieldMapper) {
			return `${orderingDirectionMapper[ordering.direction]}${orderingFieldMapper[ordering.field]}`;
		}
		return undefined;
	}
}
