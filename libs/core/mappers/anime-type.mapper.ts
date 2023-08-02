import { AnimeDtoTypes } from '../dtos/anime.dto';
import { AnimeTypes } from '../models/anime-type';

export namespace AnimeTypeMapper {
	export const ANIME_TYPE_TO_DTO: Readonly<Record<AnimeTypes, AnimeDtoTypes>> = {
		[AnimeTypes.Music]: AnimeDtoTypes.Music,
		[AnimeTypes.Ova]: AnimeDtoTypes.Ova,
		[AnimeTypes.Ona]: AnimeDtoTypes.Ona,
		[AnimeTypes.Special]: AnimeDtoTypes.Special,
		[AnimeTypes.Tv]: AnimeDtoTypes.Tv,
		[AnimeTypes.Unknown]: AnimeDtoTypes.Unknown,
		[AnimeTypes.Movie]: AnimeDtoTypes.Movie,
	};

	/**
	 * Converts type model to DTO.
	 * @param types Array of anime status.
	 */
	export function toDto(types: readonly AnimeTypes[]): string {
		return types.map(typeInElement => ANIME_TYPE_TO_DTO[typeInElement]).join(', ');
	}
}
