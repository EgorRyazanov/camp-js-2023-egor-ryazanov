import { RegisterDto } from '@js-camp/core/dtos/auth-dto/register.dto';
import { Register } from '@js-camp/core/models/auth/register';

/** Register mapper. */
export namespace RegisterMapper {

	/**
	 * Converts rigester model to dto.
	 * @param registerModel Register model.
	 */
	export function toDto(registerModel: Register): RegisterDto {
		return {
			email: registerModel.email,
			first__name: registerModel.firstName,
			last__name: registerModel.lastName,
			password: registerModel.password,
		};
	}
}
