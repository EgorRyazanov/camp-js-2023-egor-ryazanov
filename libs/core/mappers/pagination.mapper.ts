import { Pagination } from '../models/pagintation';

/** Pagination mapper. */
export namespace PaginationMapper {
	/**
	 * Converts pagination DTO to pagination model.
	 * @param pagination DTO
	 * @param dtoConvertor covertor dto to model.
	 */
	export function fromPaginationDto<TDto, TModel>(
		pagination: Pagination<TDto>,
		dtoConvertor: (dto: TDto) => TModel
	): Pagination<TModel> {
		return {
			count: pagination.count,
			next: pagination.next,
			previous: pagination.previous,
			results: pagination.results.map((result) => dtoConvertor(result)),
		};
	}
}
