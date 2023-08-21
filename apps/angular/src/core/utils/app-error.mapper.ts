import { HttpErrorResponse } from '@angular/common/http';
import { MonoTypeOperatorFunction, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppError, AppValidationError } from '@js-camp/core/models/app-error';
import { ValidationErrorMapper } from '@js-camp/core/mappers/mappers';

import { catchHttpErrorResponse } from './catch-error-response';

/** Errors mapper. */
@Injectable({
	providedIn: 'root',
})
export class AppErrorMapper {
	/**
	 * Maps `HttpErrorResponse` to an application-level error.
	 * @param httpError Http error response.
	 */
	private fromDto(httpError: HttpErrorResponse): AppError {
		return new AppError(httpError.message);
	}

	/**
	 * Maps `HttpErrorResponse` to either `AppError` or `AppValidationError`.
	 * @param httpError Http error.
	 * @param mapper Mapper for backend-provided validation data into domain validation data.
	 */
	private fromDtoWithValidationSupport<TEntity extends Record<string, unknown>>(
		httpError: HttpErrorResponse,
		mapper: ValidationErrorMapper<TEntity>
	): AppError | AppValidationError<TEntity> {
		if (httpError?.error?.errors == null) {
			return this.fromDto(httpError);
		}
		return new AppValidationError<TEntity>(httpError.message, mapper.validationErrorFromDto(httpError.error.errors));
	}

	/** RxJS operator that catches `HttpErrorResponse` and maps it into application error. */
	public catchHttpErrorToAppError<T>(): MonoTypeOperatorFunction<T> {
		return catchHttpErrorResponse((error: HttpErrorResponse) => {
			const appError = this.fromDto(error);
			return throwError(() => appError);
		});
	}

	/**
	 * RxJS operator that catches `HttpErrorResponse` and maps it into application error that may contain validation data.
	 * @param mapper Mapper for backend-provided validation data into domain validation data.
	 */
	public catchHttpErrorToAppErrorWithValidationSupport<T, TEntity extends Record<string, unknown>>(
		mapper: ValidationErrorMapper<TEntity>
	): MonoTypeOperatorFunction<T> {
		return catchHttpErrorResponse((error: HttpErrorResponse) => {
			const appError = this.fromDtoWithValidationSupport<TEntity>(error, mapper);
			return throwError(() => appError);
		});
	}
}
