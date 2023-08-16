import { AnimeTypeDto } from '../../../core/dtos/anime-dto/anime.dto';
import { AnimeType } from '../../../core/models/anime/anime-type';

export namespace AnimeTypeMapper {
	export const ANIME_TYPE_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Ova]: AnimeTypeDto.Ova,
		[AnimeType.Ona]: AnimeTypeDto.Ona,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.Tv]: AnimeTypeDto.Tv,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
		[AnimeType.Movie]: AnimeTypeDto.Movie,
	};

	/**
	 * Converts type model to DTO.
	 * @param types Array of anime status.
	 */
	export function toDto(types: readonly AnimeType[]): string {
		return types.map((typeInElement) => ANIME_TYPE_TO_DTO[typeInElement]).join(', ');
	}
}
