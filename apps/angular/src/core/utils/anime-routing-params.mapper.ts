import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { OrderingDirection, AnimeOrderingField } from '@js-camp/core/models/anime/anime-ordering';

type Enum = Record<string, string | number>;

/** Routing anime params mapper. */
export namespace RoutingAnimeParamsMapper {
	/** Default routing query parameters. */
	export const defaultQueryParams: AnimeRoutingQueryParams = {
		pageSize: 5,
		pageNumber: 0,
		type: [],
		field: AnimeOrderingField.None,
		direction: OrderingDirection.None,
		search: '',
	};

	/** Page sizes. */
	export const pageSizes: readonly number[] = [5, 10, 25];

	/**
	 * Checks that value contains in enum.
	 * @param value Value to check.
	 * @param validatingEnum Inspector.
	 */
	function isType<T extends string>(value: string, validatingEnum: Enum): boolean {
		return Object.values(validatingEnum).includes(value as T);
	}

	/**
	 * Checks that type of value is AnimeType.
	 * @param type Value to check.
	 */
	function isAnimeType(type: string): type is AnimeType {
		return isType<AnimeType>(type, AnimeType);
	}

	/**
	 * Checks that type of value is OrderingDirection.
	 * @param type Value to check.
	 */
	function isOrderingDirectionType(type: string): type is OrderingDirection {
		return isType<OrderingDirection>(type, OrderingDirection);
	}

	/**
	 * Checks that type of value is OrderingField.
	 * @param type Value to check.
	 */
	function isOrderingFieldType(type: string): type is AnimeOrderingField {
		return isType<AnimeOrderingField>(type, AnimeOrderingField);
	}

	/**
	 * Converts unknown param to page.
	 * @param page Unknown.
	 * @returns Page and value was changed flag.
	 */
	export function pageToModel(page: unknown): ChangedQueryParams<Pick<AnimeRoutingQueryParams, 'pageNumber'>> {
		if (typeof page === 'string') {
			const pageNumber = Number(page);
			if (!Number.isNaN(pageNumber)) {
				return { pageNumber, isChanged: false };
			}
		}

		return { pageNumber: defaultQueryParams.pageNumber, isChanged: true };
	}

	/**
	 * Converts unknown param to size.
	 * @param size Unknown.
	 * @returns Size and value was changed flag.
	 */
	export function sizeToModel(size: unknown): ChangedQueryParams<Pick<AnimeRoutingQueryParams, 'pageSize'>> {
		if (typeof size === 'string') {
			const pageSize = Number(size);
			if (!Number.isNaN(pageSize) && pageSizes.includes(pageSize)) {
				return { pageSize, isChanged: false };
			}
		}

		return { pageSize: defaultQueryParams.pageSize, isChanged: true };
	}

	/**
	 * Converts unknown param to search.
	 * @param search Unknown.
	 * @returns Search and value was changed flag.
	 */
	export function searchToModel(search: unknown): ChangedQueryParams<Pick<AnimeRoutingQueryParams, 'search'>> {
		if (typeof search === 'string') {
			return { search, isChanged: false };
		}
		return { search: defaultQueryParams.search, isChanged: true };
	}

	/**
	 * Converts unknown param to type.
	 * @param type Unknown.
	 * @returns Type and value was changed flag.
	 */
	export function typeToModel(type: unknown): ChangedQueryParams<Pick<AnimeRoutingQueryParams, 'type'>> {
		if (typeof type === 'string') {
			if (isAnimeType(type)) {
				return { type: [type], isChanged: false };
			}
		} else if (type instanceof Array) {
			const newTypeModel: AnimeType[] = [];
			let isChanged = false;

			type.forEach((typeElement) => {
				if (typeElement && typeof typeElement === 'string' && isAnimeType(typeElement)) {
					newTypeModel.push(typeElement);
				} else {
					isChanged = true;
				}
			});

			return { isChanged, type: newTypeModel };
		}

		return { type: defaultQueryParams.type, isChanged: true };
	}

	/**
	 * Converts unknown param to field.
	 * @param field Unknown.
	 * @returns Field and value was changed flag.
	 */
	export function fieldToModel(field: unknown): ChangedQueryParams<Pick<AnimeRoutingQueryParams, 'field'>> {
		if (typeof field === 'string') {
			if (isOrderingFieldType(field)) {
				return { field, isChanged: false };
			}
		}

		return { field: AnimeOrderingField.None, isChanged: true };
	}

	/**
	 * Converts unknown param to direction.
	 * @param direction Unknown.
	 * @returns Direction and value was changed flag.
	 */
	export function directionToModel(direction: unknown): ChangedQueryParams<Pick<AnimeRoutingQueryParams, 'direction'>> {
		if (typeof direction === 'string') {
			if (isOrderingDirectionType(direction)) {
				return { direction, isChanged: false };
			}
		}

		return { direction: OrderingDirection.None, isChanged: true };
	}

	/**
	 * Converts unknown params to typed correct.
	 * @param params Unknown params.
	 * @returns Params and values were changed flag.
	 */
	export function toModel(params: UnknownAnimeRouringQueryParams): ChangedQueryParams<AnimeRoutingQueryParams> {
		const pageState = pageToModel(params.pageNumber);
		const sizeState = sizeToModel(params.pageSize);
		const fieldState = fieldToModel(params.field);
		const typeState = typeToModel(params.type);
		const searchState = searchToModel(params.search);
		const directionState = directionToModel(params.direction);
		const isChanged =
			pageState.isChanged ||
			sizeState.isChanged ||
			fieldState.isChanged ||
			typeState.isChanged ||
			searchState.isChanged ||
			directionState.isChanged;

		return {
			isChanged,
			pageNumber: pageState.pageNumber,
			pageSize: sizeState.pageSize,
			field: fieldState.field,
			type: typeState.type,
			search: searchState.search,
			direction: directionState.direction,
		};
	}
}

/** Routing query params. */
export interface AnimeRoutingQueryParams {
	/** Page size. */
	readonly pageSize: number;

	/** Page number. */
	readonly pageNumber: number;

	/** Filter type. */
	readonly type: AnimeType[];

	/** Soring field. */
	readonly field: AnimeOrderingField;

	/** Sorting direction. */
	readonly direction: OrderingDirection;

	/** Search. */
	readonly search: string;
}

/** Unknown routing query params. */
export interface UnknownAnimeRouringQueryParams {
	/** Page size. */
	readonly pageSize: unknown;

	/** Page number. */
	readonly pageNumber: unknown;

	/** Filter type. */
	readonly type: unknown;

	/** Soring field. */
	readonly field: unknown;

	/** Sorting direction. */
	readonly direction: unknown;

	/** Search. */
	readonly search: unknown;
}

/** Changed. */
export interface Changed {
	/** Shows param was changed. */
	readonly isChanged: boolean;
}

/** Anime routing query params with status that shows some of the initial values were converted to default. */
export type ChangedQueryParams<T extends Partial<AnimeRoutingQueryParams>> = T & Changed;
