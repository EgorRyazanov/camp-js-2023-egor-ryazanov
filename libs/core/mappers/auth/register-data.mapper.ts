import { Injectable } from '@angular/core';

import { ValidationErrorDto } from '../../../core/dtos/error.dto';
import { Register } from '../../../core/models/auth/register';
import { RegisterDto } from '../../../core/dtos/auth-dto/register.dto';
import { MapperToDto, ValidationErrorMapper } from '../mappers';
import { EntityValidationErrors } from '../../models/app-error';
import { extractErrorMessages } from '../../utils/extract-error-message';

/** Register DTO fields. */
enum RegisterDtoFields {
	Email = 'email',
	Password = 'password',
	LastName = 'last__name',
	FirstName = 'first__name',
}

/** Register data mapper. */
@Injectable({
	providedIn: 'root',
})
export class RegisterDataMapper implements MapperToDto<RegisterDto, Register>, ValidationErrorMapper<Register> {
	/** @inheritdoc */
	public validationErrorFromDto(errorsDto: ValidationErrorDto[] | null | undefined): EntityValidationErrors<Register> {
		const emailErrors = extractErrorMessages(errorsDto, RegisterDtoFields.Email);
		const nonFieldErrors = extractErrorMessages(errorsDto, null);
		return {
			email: nonFieldErrors ? nonFieldErrors : emailErrors,
			password: extractErrorMessages(errorsDto, RegisterDtoFields.Password),
			lastName: extractErrorMessages(errorsDto, RegisterDtoFields.LastName),
			firstName: extractErrorMessages(errorsDto, RegisterDtoFields.FirstName),
		};
	}

	/** @inheritdoc */
	public toDto(data: Register): RegisterDto {
		return {
			email: data.email,
			first__name: data.firstName,
			last__name: data.lastName,
			password: data.password,
		};
	}
}
