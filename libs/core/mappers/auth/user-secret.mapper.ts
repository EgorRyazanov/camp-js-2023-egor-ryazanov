import { UserSecretDto } from '../../../core/dtos/auth-dto/user-secret-dto';
import { UserSecret } from '../../../core/models/auth/user-secret';

/** User secret mapper. */
export namespace UserSecretMapper {

	/**
	 * Converts secret model to DTO.
	 * @param model User Secret model.
	 */
	export function toDto(model: UserSecret): UserSecretDto {
		return {
			access: model.access,
			refresh: model.refresh,
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
