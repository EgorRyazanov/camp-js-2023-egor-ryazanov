import { RegisterDto } from '@js-camp/core/dtos/auth-dto/register.dto';
import { UserSecretDto } from '@js-camp/core/dtos/auth-dto/user-secret-dto';
import { Register } from '@js-camp/core/models/auth/register';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';

/** User secret mapper. */
export namespace UserSecretMapper {
	/**
	 * Converts secret DTO to model.
	 * @param dto User Secret DTO.
	 */
	export function fromDto(dto: UserSecretDto): UserSecret {
		return {
			access: dto.access,
			refresh: dto.refresh,
		};
	}
}
