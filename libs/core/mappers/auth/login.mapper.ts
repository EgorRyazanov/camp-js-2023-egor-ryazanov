import { LoginDto } from '@js-camp/core/dtos/auth-dto/login.dto';
import { Login } from '@js-camp/core/models/auth/login';

/** Login mapper. */
export namespace LoginMapper {
	/**
	 * Converts login model to dto.
	 * @param ordering login model.
	 */
	export function toDto(loginModel: Login): LoginDto {
		return {
			email: loginModel.email,
			password: loginModel.password,
		};
	}
}
