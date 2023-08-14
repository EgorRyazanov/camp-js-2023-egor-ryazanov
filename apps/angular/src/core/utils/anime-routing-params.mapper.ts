import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { AnimeOrderingField } from '@js-camp/core/models/anime/anime-ordering';
import { OrderingDirection } from '@js-camp/core/models/ordering-direction';
import { isType } from '@js-camp/core/utils/is-type';

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
	 * Checks that type of value is AnimeType.
	 * @param type Value to check.
	 */
	function isAnimeType(type: string): type is AnimeType {
		return isType(type, AnimeType);
	}

	/**
	 * Checks that type of value is OrderingDirection.
	 * @param type Value to check.
	 */
	function isOrderingDirectionType(type: string): type is OrderingDirection {
		return isType(type, OrderingDirection);
	}

	/**
	 * Checks that type of value is OrderingField.
	 * @param type Value to check.
	 */
	function isOrderingFieldType(type: string): type is AnimeOrderingField {
		return isType(type, AnimeOrderingField);
	}

	/**
	 * Converts unknown param to page.
	 * @param page Unknown.
	 * @returns Page and value was changed flag.
	 */
	export function pageToModel(page: Param): IncomeStatusedQueryParams<Pick<AnimeRoutingQueryParams, 'pageNumber'>> {
		const pageNumber = Number(page);
		if (Number.isNaN(pageNumber)) {
			return { pageNumber: defaultQueryParams.pageNumber, isValid: false };
		}

		return { pageNumber, isValid: true };
	}

	/**
	 * Converts unknown param to size.
	 * @param size Unknown.
	 * @returns Size and value was changed flag.
	 */
	export function sizeToModel(size: Param): IncomeStatusedQueryParams<Pick<AnimeRoutingQueryParams, 'pageSize'>> {
		const pageSize = Number(size);
		if (Number.isNaN(pageSize) || !pageSizes.includes(pageSize)) {
			return { pageSize: defaultQueryParams.pageSize, isValid: false };
		}
		return { pageSize, isValid: true };
	}

	/**
	 * Converts unknown param to search.
	 * @param search Unknown.
	 * @returns Search and value was changed flag.
	 */
	export function searchToModel(search: Param): IncomeStatusedQueryParams<Pick<AnimeRoutingQueryParams, 'search'>> {
		if (search instanceof Array) {
			return { search: defaultQueryParams.search, isValid: false };
		}

		return { search, isValid: true };
	}

	/**
	 * Converts unknown param to type.
	 * @param type Unknown.
	 * @returns Type and value was changed flag.
	 */
	export function typeToModel(type: Param): IncomeStatusedQueryParams<Pick<AnimeRoutingQueryParams, 'type'>> {
		if (type instanceof Array) {
			const newTypeModel = type.filter(
				typeElement => typeof typeElement === 'string' && isAnimeType(typeElement),
			) as AnimeType[];
			return { isValid: newTypeModel.length === type.length, type: newTypeModel };
		} else if (isAnimeType(type)) {
			return { type: [type], isValid: true };
		}

		return { type: defaultQueryParams.type, isValid: false };
	}

	/**
	 * Converts unknown param to field.
	 * @param field Unknown.
	 * @returns Field and value was changed flag.
	 */
	export function fieldToModel(field: Param): IncomeStatusedQueryParams<Pick<AnimeRoutingQueryParams, 'field'>> {
		if (field instanceof Array || !isOrderingFieldType(field)) {
			return { field: AnimeOrderingField.None, isValid: false };
		}

		return { field, isValid: true };
	}

	/**
	 * Converts unknown param to direction.
	 * @param direction Unknown.
	 * @returns Direction and value was changed flag.
	 */
	export function directionToModel(
		direction: Param,
	): IncomeStatusedQueryParams<Pick<AnimeRoutingQueryParams, 'direction'>> {
		if (direction instanceof Array || !isOrderingDirectionType(direction)) {
			return { direction: OrderingDirection.None, isValid: false };
		}

		return { direction, isValid: true };
	}

	/**
	 * Converts unknown params to typed correct.
	 * @param params Unknown params.
	 * @returns Params and values were changed flag.
	 */
	export function toModel(params: QueryParams): IncomeStatusedQueryParams<AnimeRoutingQueryParams> {
		const pageState = pageToModel(params.pageNumber);
		const sizeState = sizeToModel(params.pageSize);
		const fieldState = fieldToModel(params.field);
		const typeState = typeToModel(params.type);
		const searchState = searchToModel(params.search);
		const directionState = directionToModel(params.direction);
		const isValid =
			pageState.isValid &&
			sizeState.isValid &&
			fieldState.isValid &&
			typeState.isValid &&
			searchState.isValid &&
			directionState.isValid;

		return {
			isValid,
			pageNumber: pageState.pageNumber,
			pageSize: sizeState.pageSize,
			field: fieldState.field,
			type: typeState.type,
			search: searchState.search,
			direction: directionState.direction,
		};
	}
}

/** Converted routing query params. */
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

type Param = string[] | string;

/** Routing query params that goes from search input. */
export interface QueryParams {

	/** Page size. */
	readonly pageSize: Param;

	/** Page number. */
	readonly pageNumber: Param;

	/** Filter type. */
	readonly type: Param;

	/** Soring field. */
	readonly field: Param;

	/** Sorting direction. */
	readonly direction: Param;

	/** Search. */
	readonly search: Param;
}

/** Income values with status about change if values is incorrect. */
export interface IncomeValuesStatus {

	/** Shows status of validity of income value. */
	readonly isValid: boolean;
}

/** Anime routing query params with status that shows some of the initial values were converted to default. */
export type IncomeStatusedQueryParams<T extends Partial<AnimeRoutingQueryParams>> = T & IncomeValuesStatus;
