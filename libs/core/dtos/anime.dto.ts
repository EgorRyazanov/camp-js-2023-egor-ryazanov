import { Aired, Type, Status } from "../utils/types";
import { PaginationDto } from "./pagination.dto";

export interface AnimeDto {
	id: number;
	created: string;
	modified: string;
	title_eng: string;
	title_jpn: string;
	image: string;
	aired: Aired;
	type: Type;
	status: Status;
	score: number | null;
	user_score: number | null;
}

export type AnimePaginationDto = PaginationDto<AnimeDto>
