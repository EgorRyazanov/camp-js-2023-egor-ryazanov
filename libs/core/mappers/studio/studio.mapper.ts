import { StudioDTO } from '../../../core/dtos/studios-dto/studio.dto';
import { Studio } from '../../../core/models/studio/studio';

/** Studio Mapper. */
export namespace StudioMapper {

	/**
	 * Converts studio from DTO to model.
	 * @param dto Studio DTO.
	 */
	export function fromDto(dto: StudioDTO): Studio {
		return {
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			name: dto.name,
		};
	}
}
