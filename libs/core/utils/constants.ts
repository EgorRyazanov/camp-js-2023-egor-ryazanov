import { AnimeParameters } from '../models/anime-params';

/** Base http parameters. */
export const BASE_ANIME_PARAMS: AnimeParameters = new AnimeParameters({
	offset: 20000,
	limit: 25,
});
