/** Image bucket. */
export interface ImageBucket {

	/** Dest. */
	dest: Dest;

	/** Filename. */
	filename?: string;

	/** Content type. */
	contentType?: string;
}

/** Dest. */
export enum Dest {
	AnimeImages = 'animeImages',
	UsersAvatars = 'userAvatars',
}
