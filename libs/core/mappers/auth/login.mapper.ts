import { LoginDto } from '../../../core/dtos/auth-dto/login.dto';
import { Login } from '../../../core/models/auth/login';

/** Login mapper. */
export namespace LoginMapper {

	/**
	 * Converts login model to dto.
	 * @param loginModel Login model.
	 */
	export function toDto(loginModel: Login): LoginDto {
		return {
			email: loginModel.email,
			password: loginModel.password,
		};
	}
}
