import { Pagination } from '../pagintation';

import { AnimeStatus } from './anime-status';
import { AnimeTypes } from './anime-type';

/** Anime. */
export class Anime {
	/** ID. */
	public readonly id: number;

	/** English title. */
	public readonly titleEnglish: string;

	/** Japanese title. */
	public readonly titleJapanese: string;

	/** Image. */
	public readonly image: string;

	/** Type. */
	public readonly type: AnimeTypes;

	/** Status. */
	public readonly status: AnimeStatus;

	public constructor(data: Anime) {
		this.id = data.id;
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.image = data.image;
		this.type = data.type;
		this.status = data.status;
	}
}

/** Anime pagination. */
export type AnimePagination = Pagination<Anime>;
