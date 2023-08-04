import { ValidationErrorDto } from '../dtos/error.dto';
import { AppError, ValidationError } from '../models/app-error';

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
	 * @param validationErrorsDto Validation Errors DTO.
	 * @param errorMessage Error message.
	 */
	export function fromDto(validationErrorsDto: ValidationErrorDto[], errorMessage: string): AppError {
		const validationErrors: Record<string, ValidationError[]> = {};
		validationErrorsDto.forEach(error => {
			const attribute = FORM_FIELD_FROM_DTO[error.attr] ?? COMMON_ERROR_FIELD;
			if (!(attribute in validationErrors)) {
				validationErrors[attribute] = [];
			}
			validationErrors[attribute].push({
				code: error.code,
				message: error.detail,
			});
		});

		return new AppError(errorMessage, validationErrors);
	}
}
