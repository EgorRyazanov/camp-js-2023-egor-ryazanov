import { GenreParamsDto } from '@js-camp/core/dtos/genre-dto/genre-params.dto';
import { GenreParams } from '../../models/genre/genre-params';
import { deleteUndefinedProperties } from '@js-camp/core/utils/delete-undefined-properties';

export namespace GenreParamsMapper {
	const defaultPageSize = 7;

	export function toDto(model: GenreParams): GenreParamsDto {
		return deleteUndefinedProperties({
			search: model.search,
			limit: model.pageNumber != undefined ? model.pageSize ?? defaultPageSize : undefined,
			offset: model.pageNumber * (model.pageSize ?? defaultPageSize),
			name: model.name,
		});
	}
}
