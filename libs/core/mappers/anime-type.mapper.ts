import { AnimeDtoTypes } from '../dtos/anime.dto';
import { AnimeTypes } from '../models/anime';

export namespace AnimeTypeMapper {
	export const ANIME_TYPE_TO_DTO: Readonly<Record<AnimeTypes, AnimeDtoTypes>> = {
		[AnimeTypes.MUSIC]: AnimeDtoTypes.MUSIC,
		[AnimeTypes.OVA]: AnimeDtoTypes.OVA,
		[AnimeTypes.ONA]: AnimeDtoTypes.ONA,
		[AnimeTypes.SPECIAL]: AnimeDtoTypes.SPECIAL,
		[AnimeTypes.TV]: AnimeDtoTypes.TV,
		[AnimeTypes.UNKNOWN]: AnimeDtoTypes.UNKNOWN,
		[AnimeTypes.MOVIE]: AnimeDtoTypes.MOVIE,
	};

	/**
	 * Converts type model to DTO.
	 * @param types Array of anime status.
	 */
	export function toDto(types: readonly AnimeTypes[]): string {
		return types.map(typeInElement => ANIME_TYPE_TO_DTO[typeInElement]).join(', ');
	}
}
