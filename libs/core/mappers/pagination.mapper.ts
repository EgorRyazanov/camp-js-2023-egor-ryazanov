import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagintation';

/** Pagination mapper. */
export namespace PaginationMapper {

	/**
	 * Converts pagination DTO to pagination model.
	 * @param pagination DTO.
	 * @param dtoMapper Mapper DTO to model.
	 */
	export function fromDto<TDto, TModel>(
		pagination: PaginationDto<TDto>,
		dtoMapper: (dto: TDto) => TModel,
	): Pagination<TModel> {
		return {
			count: pagination.count,
			next: pagination.next,
			previous: pagination.previous,
			items: pagination.results.map(item => dtoMapper(item)),
		};
	}
}
