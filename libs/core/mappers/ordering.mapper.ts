import { Ordering } from '../utils/types';

type OrderingHelper = { [key in string]: string };

export namespace OrderingMapper {
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
