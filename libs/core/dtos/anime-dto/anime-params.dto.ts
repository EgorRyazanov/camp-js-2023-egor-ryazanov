import { AnimeStatusDto } from './anime.dto';
import { DefaultParamsDto } from '../default-params';

/** Anime parameters DTO. */
export interface AnimeParametersDto extends DefaultParamsDto {
	/** Ordering. */
	readonly ordering?: string;

	/** Status. */
	readonly status?: AnimeStatusDto;

	/** Type in. */
	readonly type__in?: string;
}
