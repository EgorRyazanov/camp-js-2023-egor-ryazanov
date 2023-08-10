import { ValidationErrorDto } from '../dtos/error.dto';

/**
 * Finds and extract errors by atrribute.
 * @param errorsDto Validation DTO errors.
 * @param attribute Attribute.
 */
export function extractErrorMessages(
	errorsDto: ValidationErrorDto[] | null | undefined,
	attribute: string | null,
): string | undefined {
	return errorsDto
		?.filter(errorDto => errorDto.attr === attribute)
		.map(errorDto => errorDto.detail)
		.join(' ');
}
