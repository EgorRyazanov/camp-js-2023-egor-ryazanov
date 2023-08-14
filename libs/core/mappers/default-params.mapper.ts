import { deleteUndefinedProperties } from '@js-camp/core/utils/delete-undefined-properties';
import { DefaultParams } from '../models/default-params';
import { DefaultParamsDto } from '../dtos/default-params';

export namespace DefaultParamsMapper {
	const defaultPageSize = 5;

	export function toDto(model: DefaultParams): DefaultParamsDto {
		return deleteUndefinedProperties({
			search: model.search,
			limit: model?.pageSize ?? defaultPageSize,
			offset: model.pageNumber * (model?.pageSize ?? defaultPageSize),
			name: model.name,
		});
	}
}
