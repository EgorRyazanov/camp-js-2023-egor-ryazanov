import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

export namespace AnimeMapper {
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			created: dto.created,
			modified: dto.modified,
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			aired: dto.aired,
			type: dto.type,
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
		});
	}
}
