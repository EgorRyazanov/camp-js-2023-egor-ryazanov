import { ErrorDto } from '../dtos/error.dto';
import { AppError } from '../models/app-error';

/** Error Mapper. */
export namespace ErrorMapper {
	export const COMMON_ERROR_FIELD = 'common';

	const FORM_FIELD_FROM_DTO: Record<string, string> = {
		email: 'email',
		password: 'password',
		first__name: 'firstName',
		last__name: 'lastName',
	};

	/**
	 * Converts DTO errors to model.
	 * @param errors DTO errors.
	 */
	export function fromDto(errors: ErrorDto[]): AppError[] {
		return errors.map(
			error => new AppError(error.detail, FORM_FIELD_FROM_DTO[error.attr] ?? COMMON_ERROR_FIELD, error.code),
		);
	}
}
