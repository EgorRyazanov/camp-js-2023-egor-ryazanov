import { UserSecretDto } from '@js-camp/core/dtos/auth-dto/user-secret-dto';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';

/** User secret mapper. */
export namespace UserSecretMapper {
	/**
	 * Converts secret model to DTO.
	 * @param modal User Secret model.
	 */
	export function toDto(modal: UserSecret): UserSecretDto {
		return {
			access: modal.access,
			refresh: modal.refresh,
		};
	}

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
