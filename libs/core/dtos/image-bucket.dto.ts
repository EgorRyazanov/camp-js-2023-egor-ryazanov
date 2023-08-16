/** Image bucket DTO. */
export interface ImageBucketDto {

	/** Dest. */
	readonly dest: DestDto;

	/** Filename. */
	readonly filename?: string;

	/** Content type. */
	readonly content_type?: string;
}

/** Dest DTO. */
export enum DestDto {
	AnimeImages = 'anime_images',
	UsersAvatars = 'user_avatars',
}
