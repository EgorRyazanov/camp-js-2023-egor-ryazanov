import { AiredDto } from '../dtos/aired-dto';
import { Aired } from '../models/anime/anime-detail';

/** Aired. */
export namespace AiredMapper {

	/**
	 * Convert aired from model to DTO.
	 * @param model Aired.
	 */
	export function toDto(model: Aired): AiredDto {
		return {
			start: model.start?.toISOString() ?? null,
			end: model.end?.toISOString() ?? null,
		};
	}

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
