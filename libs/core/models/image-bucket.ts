export interface ImageBucket {
	dest: Dest;
	filename?: string;
	contentType?: string;
}

export enum Dest {
	AnimeImages = 'animeImages',
	UsersAvatars = 'userAvatars',
}
