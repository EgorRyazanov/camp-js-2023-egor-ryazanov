import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagintation';

/** Pagination mapper. */
export namespace PaginationMapper {

	/**
	 * Converts pagination DTO to pagination model.
	 * @param pagination DTO.
	 * @param dtoConvertor Covertor dto to model.
	 */
	export function fromPaginationDto<TDto, TModel>(
		pagination: PaginationDto<TDto>,
		dtoConvertor: (dto: TDto) => TModel,
	): Pagination<TModel> {
		return {
			count: pagination.count,
			next: pagination.next,
			previous: pagination.previous,
			items: pagination.results.map(item => dtoConvertor(item)),
		};
	}
}
