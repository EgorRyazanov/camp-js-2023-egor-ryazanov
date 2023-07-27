import { AnimeDtoTypes } from '../dtos/anime.dto';
import { AnimeTypes } from '../models/anime';

export namespace AnimeType {
	export const ANIME_TYPE_TO_DTO: Readonly<Record<AnimeTypes, AnimeDtoTypes>> = {
		[AnimeTypes.MUSIC]: AnimeDtoTypes.MUSIC,
		[AnimeTypes.OVA]: AnimeDtoTypes.OVA,
		[AnimeTypes.ONA]: AnimeDtoTypes.ONA,
		[AnimeTypes.SPECIAL]: AnimeDtoTypes.SPECIAL,
		[AnimeTypes.TV]: AnimeDtoTypes.TV,
		[AnimeTypes.UNKNOWN]: AnimeDtoTypes.UNKNOWN,
		[AnimeTypes.MOVIE]: AnimeDtoTypes.MOVIE,
	};

	export function toDto(types: readonly AnimeTypes[]): string {
		return types.map((typeInElement) => ANIME_TYPE_TO_DTO[typeInElement]).join(', ');
	}
}
