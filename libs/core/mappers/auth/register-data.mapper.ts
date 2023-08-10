import { Injectable } from '@angular/core';

import { ValidationErrorDto } from '../../../core/dtos/error.dto';
import { Registration } from '../../models/auth/registration';
import { RegistrationDto } from '../../dtos/auth-dto/registration.dto';
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
export class RegistrationDataMapper
implements MapperToDto<RegistrationDto, Registration>, ValidationErrorMapper<Registration> {
	/** @inheritdoc */
	public validationErrorFromDto(
		errorsDto: ValidationErrorDto[] | null | undefined,
	): EntityValidationErrors<Registration> {
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
	public toDto(data: Registration): RegistrationDto {
		return {
			email: data.email,
			first__name: data.firstName,
			last__name: data.lastName,
			password: data.password,
		};
	}
}
