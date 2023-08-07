import { Injectable } from '@angular/core';

import { Login } from '../../../core/models/auth/login';
import { LoginDto } from '../../../core/dtos/auth-dto/login.dto';
import { ValidationErrorDto } from '../../../core/dtos/error.dto';

import { EntityValidationErrors } from '../../models/app-error';
import { IMapperToDto, IValidationErrorMapper } from '../mappers';
import { extractErrorMessages } from '../../utils/extract-error-message';

/** Login DTO fields. */
enum LoginDtoFields {
	email = 'email',
	password = 'password',
}

/** Login data mapper. */
@Injectable({
	providedIn: 'root',
})
export class LoginDataMapper implements IMapperToDto<LoginDto, Login>, IValidationErrorMapper<Login> {
	/** @inheritdoc */
	public validationErrorFromDto(errorsDto: ValidationErrorDto[] | null | undefined): EntityValidationErrors<Login> {
		return {
			email: extractErrorMessages(errorsDto, LoginDtoFields.email),
			password: extractErrorMessages(errorsDto, LoginDtoFields.password),
			nonFieldErrors: extractErrorMessages(errorsDto, null),
		};
	}

	/** @inheritdoc */
	public toDto(data: Login): LoginDto {
		return data;
	}
}
