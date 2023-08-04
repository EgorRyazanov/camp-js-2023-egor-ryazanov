import { GenreDto, GenreTypesDto } from '../../../core/dtos/genre-dto/genre.dto';
import { Genre, GenreTypes } from '../../../core/models/genre/genre';

/** Genre Mapper. */
export namespace GenreMapper {
	const TYPE_FROM_DTO: Record<GenreTypesDto, GenreTypes> = {
		[GenreTypesDto.Demographics]: GenreTypes.Demographics,
		[GenreTypesDto.ExplicitGenres]: GenreTypes.ExplicitGenres,
		[GenreTypesDto.Genres]: GenreTypes.Genres,
		[GenreTypesDto.Themes]: GenreTypes.Themes,
	};

	export function toReadable(genres: readonly Genre[]) {
		return genres.map((genre) => genre.name).join(', ');
	}

	/**
	 * Converts genre from DTO to model.
	 * @param dto Genre DTO.
	 */
	export function fromDto(dto: GenreDto): Genre {
		return {
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			name: dto.name,
			type: TYPE_FROM_DTO[dto.type],
		};
	}
}
