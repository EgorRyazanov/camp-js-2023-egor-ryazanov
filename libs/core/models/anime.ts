import { Aired, Status, Type } from '../utils/types';

import { Immerable, OmitImmerable } from './immerable';
import { Pagination } from './pagintation';

export class Anime extends Immerable {
	public readonly id: number;
	public readonly created: string;
	public readonly modified: string;
	public readonly titleEnglish: string;
	public readonly titleJapanese: string;
	public readonly image: string;
	public readonly aired: Aired;
	public readonly type: Type;
	public readonly status: Status;
	public readonly score: number | null;
	public readonly userScore: number | null;

	public constructor(data: AnimeConstructorData) {
		super();
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
	}
}

type AnimeConstructorData = OmitImmerable<Anime>;
export type AnimePagination = Pagination<Anime>;
