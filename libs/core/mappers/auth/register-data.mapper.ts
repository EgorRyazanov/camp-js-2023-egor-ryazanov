import { Injectable } from '@angular/core';

import { ValidationErrorDto } from '../../../core/dtos/error.dto';
import { Register } from '../../../core/models/auth/register';
import { RegisterDto } from '../../../core/dtos/auth-dto/register.dto';
import { IMapperToDto, IValidationErrorMapper } from '../mappers';
import { EntityValidationErrors } from '../../models/app-error';
import { extractErrorMessages } from '../../utils/extract-error-message';

/** Register DTO fields. */
enum RegisterDtoFields {
	email = 'email',
	password = 'password',
	lastName = 'last__name',
	firstName = 'first__name',
}

/** Register data mapper. */
@Injectable({
	providedIn: 'root',
})
export class RegisterDataMapper implements IMapperToDto<RegisterDto, Register>, IValidationErrorMapper<Register> {
	/** @inheritdoc */
	public validationErrorFromDto(errorsDto: ValidationErrorDto[] | null | undefined): EntityValidationErrors<Register> {
		return {
			email: extractErrorMessages(errorsDto, RegisterDtoFields.email),
			password: extractErrorMessages(errorsDto, RegisterDtoFields.password),
			lastName: extractErrorMessages(errorsDto, RegisterDtoFields.lastName),
			firstName: extractErrorMessages(errorsDto, RegisterDtoFields.firstName),
			nonFieldErrors: extractErrorMessages(errorsDto, null),
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
