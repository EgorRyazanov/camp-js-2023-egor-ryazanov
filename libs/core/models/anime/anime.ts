import { Pagination } from '../pagintation';

import { Aired } from './anime-detail';

import { AnimeStatuses } from './anime-status';
import { AnimeType } from './anime-type';

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
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatuses;

	/** Aired dates. */
	public readonly aired: Aired;

	public constructor(data: Anime) {
		this.id = data.id;
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.image = data.image;
		this.type = data.type;
		this.status = data.status;
		this.aired = data.aired;
	}
}

/** Anime pagination. */
export type AnimePagination = Pagination<Anime>;
