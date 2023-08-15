export interface ImageBucketDto {
	dest: DestDto;
	filename?: string;
	content_type?: string;
}

export enum DestDto {
	AnimeImages = 'anime_images',
	UsersAvatars = 'user_avatars',
}
