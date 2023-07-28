import { Ordering } from '../models/anime';

type OrderingFieldMapper = Record<string, string>;

/** Ordering mapper. */
export namespace OrderingMapper {

	/**
	 * Converts ordering model to DTO.
	 * @param ordering Model.
	 * @param orderingFieldMapper Converts field model to dto.
	 */
	export function toDto(ordering: Ordering | undefined, orderingFieldMapper: OrderingFieldMapper): string | undefined {
		if (!ordering) {
			return undefined;
		}
		if (ordering?.field in orderingFieldMapper) {
			return ordering.direction === 'asc' ?
				`-${orderingFieldMapper[ordering.field]}` :
				orderingFieldMapper[ordering.field];
		}
		return undefined;
	}
}
