import { AiredDto } from '../dtos/aired-dto';
import { Aired } from '../models/anime/anime-detail';

/** Aired. */
export namespace Airing {

	/**
	 * Convert aired from DTO to mode.
	 * @param dto Aired DTO.
	 */
	export function fromDto(dto: AiredDto): Aired {
		return {
			start: dto.start ? new Date(dto.start) : null,
			end: dto.end ? new Date(dto.end) : null,
		};
	}
}
