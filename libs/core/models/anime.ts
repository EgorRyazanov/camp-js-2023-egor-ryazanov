import { Aired, Status, Type } from '../utils/types';

import { Immerable, OmitImmerable } from './immerable';
import { Pagination } from './pagintation';

/** Anime. */
export class Anime extends Immerable {
	/** Id. */
	public readonly id: number;
	/** Created date. */
	public readonly created: string;
	/** Modified date. */
	public readonly modified: string;
	/** English title */
	public readonly titleEnglish: string;
	/** Japanese title. */
	public readonly titleJapanese: string;
	/** Image. */
	public readonly image: string;
	/** Aired dates. */
	public readonly aired: Aired;
	/** Type. */
	public readonly type: Type;
	/** Status. */
	public readonly status: Status;
	/** Score. */
	public readonly score: number | null;
	/** User score. */
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
/** Constructor of anime model. */
type AnimeConstructorData = OmitImmerable<Anime>;
/** Anime pagination. */
export type AnimePagination = Pagination<Anime>;
