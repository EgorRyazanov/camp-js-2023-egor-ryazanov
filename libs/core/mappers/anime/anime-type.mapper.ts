import { AnimeDtoTypes } from '@js-camp/core/dtos/anime-dto/anime.dto';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';

export namespace AnimeTypeMapper {
	export const ANIME_TYPE_TO_DTO: Readonly<Record<AnimeType, AnimeDtoTypes>> = {
		[AnimeType.Music]: AnimeDtoTypes.Music,
		[AnimeType.Ova]: AnimeDtoTypes.Ova,
		[AnimeType.Ona]: AnimeDtoTypes.Ona,
		[AnimeType.Special]: AnimeDtoTypes.Special,
		[AnimeType.Tv]: AnimeDtoTypes.Tv,
		[AnimeType.Unknown]: AnimeDtoTypes.Unknown,
		[AnimeType.Movie]: AnimeDtoTypes.Movie,
	};

	/**
	 * Converts type model to DTO.
	 * @param types Array of anime status.
	 */
	export function toDto(types: readonly AnimeType[]): string {
		return types.map((typeInElement) => ANIME_TYPE_TO_DTO[typeInElement]).join(', ');
	}
}
