import { Ordering } from '../models/anime';

type OrderingHelper = { [key in string]: string };

/** Ordering mapper. */
export namespace OrderingMapper {

	/**
	 * Converts ordering model to dto.
	 * @param ordering Model.
	 * @param orderingHelper Convert to dto.
	 */
	export function toDto(ordering: Ordering | undefined, orderingHelper: OrderingHelper): string | undefined {
		if (!ordering) {
			return undefined;
		}
		if (ordering?.field in orderingHelper) {
			return ordering.direction === 'asc' ? `-${orderingHelper[ordering.field]}` : orderingHelper[ordering.field];
		}
		return undefined;
	}
}
