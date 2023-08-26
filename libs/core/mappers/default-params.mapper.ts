import { deleteUndefinedProperties } from '../utils/delete-undefined-properties';

import { DefaultParams } from '../models/default-params';
import { DefaultParamsDto } from '../dtos/default-params';

/** Default params mapper. */
export namespace DefaultParamsMapper {
	const defaultPageSize = 5;

	/**
	 * Converts model params to DTO.
	 * @param model Params.
	 */
	export function toDto(model: DefaultParams): DefaultParamsDto {
		return deleteUndefinedProperties({
			search: model.search,
			limit: model?.pageSize ?? defaultPageSize,
			offset: model.pageNumber ? model.pageNumber * (model?.pageSize ?? defaultPageSize) : undefined,
			name: model.name,
		});
	}
}
