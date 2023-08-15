import { DestDto, ImageBucketDto } from '../dtos/image-bucket.dto';
import { Dest, ImageBucket } from '../models/image-bucket';
import { deleteUndefinedProperties } from '../utils/delete-undefined-properties';

export namespace ImageBucketMapper {
	const DEST_TO_DTO: Record<Dest, DestDto> = {
		[Dest.AnimeImages]: DestDto.AnimeImages,
		[Dest.UsersAvatars]: DestDto.UsersAvatars,
	};

	export function toDto(model: ImageBucket): ImageBucketDto {
		return deleteUndefinedProperties({
			dest: DEST_TO_DTO[model.dest],
			filename: model.filename,
			content_type: model.contentType,
		});
	}
}
