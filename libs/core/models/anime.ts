import { Aired, Status, Type } from '../utils/types';

import { Immerable, OmitImmerable } from './immerable';

export class Anime extends Immerable {
	public readonly id: number;
	public readonly created: string;
	public readonly modified: string;
	public readonly titleEng: string;
	public readonly titleJpn: string;
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
		this.titleEng = data.titleEng;
		this.titleJpn = data.titleJpn;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
	}
}

type AnimeConstructorData = OmitImmerable<Anime>;
