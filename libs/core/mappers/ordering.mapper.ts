import { OrderingDirectionDto } from '../dtos/ordering-direction.dto';
import { OrderingDirection } from '../models/ordering-direction';

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
	const ORDERING_DIRECTION_TO_DTO = {
		[OrderingDirection.Ascending]: OrderingDirectionDto.Ascending,
		[OrderingDirection.Descending]: OrderingDirectionDto.Descending,
		[OrderingDirection.None]: OrderingDirectionDto.None,
	};

	/**
	 * Converts ordering model to DTO.
	 * @param ordering Model.
	 * @param orderingFieldMapper Converts field model to DTO.
	 * @param orderingDirectionMapper Coverts direction model to DTO.
	 */
	export function toDto<OrderingField extends string>(
		ordering: Ordering<OrderingField> | undefined,
		orderingFieldMapper: OrderingMapper,
	): string | undefined {
		if (ordering == null) {
			return undefined;
		}
		if (ordering?.field in orderingFieldMapper) {
			return `${ORDERING_DIRECTION_TO_DTO[ordering.direction]}${orderingFieldMapper[ordering.field]}`;
		}
		return undefined;
	}
}
