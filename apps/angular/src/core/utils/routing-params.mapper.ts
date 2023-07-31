import { AnimeTypes } from '@js-camp/core/models/anime-type';
import { AnimeOrderingDirection, AnimeOrderingField } from '@js-camp/core/models/anime-ordering';

/** Routing anime params mapper. */
export namespace RoutingAnimeParamsMapper {

	/** Default routing query parameters. */
	export const defaultQueryParams: AnimeRoutingQueryParams = {
		pageSize: 5,
		pageNumber: 0,
		type: [],
		field: AnimeOrderingField.NONE,
		direction: AnimeOrderingDirection.NONE,
		search: '',
	};

	/** Page sizes. */
	export const pageSizes: readonly number[] = [5, 10, 25];

	/**
	 * Checks string is number.
	 * @param value String.
	 */
	function isNumeric(value: string): boolean {
		return /^\d+$/.test(value);
	}

	/**
	 * Checks for param type.
	 * @param value String.
	 */
	function isType(value: string): boolean {
		return Object.values(AnimeTypes).includes(value as AnimeTypes);
	}

	/**
	 * Checks for param field.
	 * @param value String.
	 */
	function isField(value: string): boolean {
		return Object.values(AnimeOrderingField).includes(value as AnimeOrderingField);
	}

	/**
	 * Checks for param direction.
	 * @param value String.
	 */
	function isDirection(value: string): boolean {
		return Object.values(AnimeOrderingDirection).includes(value as AnimeOrderingDirection);
	}

	/**
	 * Converts unknown param to page.
	 * @param page Unknown.
	 * @returns Page and value was changed flag.
	 */
	export function pageToModal(page: unknown): Pick<AnimeRoutingQueryParams, 'pageNumber'> & Changed {
		if (typeof page === 'string') {
			if (isNumeric(page)) {
				return { pageNumber: Number(page), isChanged: false };
			}
		}

		return { pageNumber: defaultQueryParams.pageNumber, isChanged: true };
	}

	/**
	 * Converts unknown param to size.
	 * @param size Unknown.
	 * @returns Size and value was changed flag.
	 */
	export function sizeToModal(size: unknown): Pick<AnimeRoutingQueryParams, 'pageSize'> & Changed {
		if (typeof size === 'string') {
			if (isNumeric(size) && pageSizes.includes(Number(size))) {
				return { pageSize: Number(size), isChanged: false };
			}
		}

		return { pageSize: defaultQueryParams.pageSize, isChanged: true };
	}

	/**
	 * Converts unknown param to search.
	 * @param search Unknown.
	 * @returns Search and value was changed flag.
	 */
	export function searchToModal(search: unknown): Pick<AnimeRoutingQueryParams, 'search'> & Changed {
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
	export function typeToModal(type: unknown): Pick<AnimeRoutingQueryParams, 'type'> & Changed {
		if (typeof type === 'string') {
			if (isType(type)) {
				return { type: [type as AnimeTypes], isChanged: false };
			}
		} else if (type instanceof Array) {
			const modal: AnimeTypes[] = [];
			let isChanged = false;
			type.forEach(element => {
				if (element && typeof element === 'string' && isType(element)) {
					modal.push(element as AnimeTypes);
				} else {
					isChanged = true;
				}
			});

			return { isChanged, type: modal };
		}

		return { type: defaultQueryParams.type, isChanged: true };
	}

	/**
	 * Converts unknown param to field.
	 * @param field Unknown.
	 * @returns Field and value was changed flag.
	 */
	export function fieldToModal(field: unknown): Pick<AnimeRoutingQueryParams, 'field'> & Changed {
		if (typeof field === 'string') {
			if (isField(field)) {
				return { field: field as AnimeOrderingField, isChanged: false };
			}
		}

		return { field: AnimeOrderingField.NONE, isChanged: true };
	}

	/**
	 * Converts unknown param to direction.
	 * @param direction Unknown.
	 * @returns Direction and value was changed flag.
	 */
	export function directionToModal(direction: unknown): Pick<AnimeRoutingQueryParams, 'direction'> & Changed {
		if (typeof direction === 'string') {
			if (isDirection(direction)) {
				return { direction: direction as AnimeOrderingDirection, isChanged: false };
			}
		}

		return { direction: AnimeOrderingDirection.NONE, isChanged: true };
	}

	/**
	 * Converts unknown params to typed correct.
	 * @param params Unknown params.
	 * @returns Params and values were changed flag.
	 */
	export function toModal(params: UnknownAnimeRouringQueryParams): {
		params: AnimeRoutingQueryParams;
	} & Changed {
		const pageState = pageToModal(params.pageNumber);
		const sizeState = sizeToModal(params.pageSize);
		const fieldState = fieldToModal(params.field);
		const typeState = typeToModal(params.type);
		const searchState = searchToModal(params.search);
		const directionState = directionToModal(params.direction);
		let isChanged = false;
		if (
			pageState.isChanged ||
			sizeState.isChanged ||
			fieldState.isChanged ||
			typeState.isChanged ||
			searchState.isChanged ||
			directionState.isChanged
		) {
			isChanged = true;
		}
		return {
			isChanged,
			params: {
				pageNumber: pageState.pageNumber,
				pageSize: sizeState.pageSize,
				field: fieldState.field,
				type: typeState.type,
				search: searchState.search,
				direction: directionState.direction,
			},
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
	readonly type: AnimeTypes[];

	/** Soring field. */
	readonly field: AnimeOrderingField;

	/** Sorting direction. */
	readonly direction: AnimeOrderingDirection;

	/** Search. */
	readonly search: string;
}

/** Unknown routing query params. */
interface UnknownAnimeRouringQueryParams {

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
interface Changed {

	/** Shows param was changed. */
	readonly isChanged: boolean;
}
