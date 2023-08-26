/** Image bucket. */
export interface ImageBucket {

	/** Dest. */
	readonly dest: Dest;

	/** Filename. */
	readonly filename?: string;

	/** Content type. */
	readonly contentType?: string;
}

/** Dest. */
export enum Dest {
	AnimeImages = 'animeImages',
	UsersAvatars = 'userAvatars',
}
