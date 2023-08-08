import { Injectable } from '@angular/core';

import { Login } from '../../../core/models/auth/login';
import { LoginDto } from '../../../core/dtos/auth-dto/login.dto';
import { ValidationErrorDto } from '../../../core/dtos/error.dto';

import { EntityValidationErrors } from '../../models/app-error';
import { MapperToDto, ValidationErrorMapper } from '../mappers';
import { extractErrorMessages } from '../../utils/extract-error-message';

/** Login DTO fields. */
enum LoginDtoFields {
	Email = 'email',
	Password = 'password',
}

/** Login data mapper. */
@Injectable({
	providedIn: 'root',
})
export class LoginDataMapper implements MapperToDto<LoginDto, Login>, ValidationErrorMapper<Login> {
	/** @inheritdoc */
	public validationErrorFromDto(errorsDto: ValidationErrorDto[] | null | undefined): EntityValidationErrors<Login> {
		return {
			email: extractErrorMessages(errorsDto, LoginDtoFields.Email),
			password: extractErrorMessages(errorsDto, LoginDtoFields.Password),
			nonFieldErrors: extractErrorMessages(errorsDto, null),
		};
	}

	/** @inheritdoc */
	public toDto(data: Login): LoginDto {
		return {
			email: data.email,
			password: data.password,
		};
	}
}
