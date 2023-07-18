import { AnimeParams } from '../models/anime-params';

export const BASE_URL = new URL('https://api.camp-js.saritasa.rocks');
export const BASE_ANIME_PARAMS: AnimeParams = new AnimeParams({
	offset: 20000,
	limit: 25,
});
