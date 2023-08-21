import { FormGroup } from '@angular/forms';
import { AppValidationError, EntityValidationErrors } from '@js-camp/core/models/app-error';
import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';

/**
 * Caches form errors.
 * @param form Form for set errors to it.
 */
export function catchFormErrors<T>(form: FormGroup): OperatorFunction<T, T> {
	return (source$: Observable<T>) =>
		source$.pipe(
			catchError((errors: unknown) => {
				if (errors instanceof AppValidationError) {
					fillFormWithError(form, errors.validationData);
				}

				return throwError(() => errors);
			}),
		);
}

/**
 * Fill the form with error data.
 * @param form Form to fill.
 * @param errors Array of errors.
 */
function fillFormWithError<T>(form: FormGroup, errors: EntityValidationErrors<T>): void {
	const controlKeys = Object.keys(form.controls) as (keyof T)[];
	controlKeys.forEach(key => {
		const error = errors[key];
		const control = form.controls[key as string];
		if (error && control) {
			control.setErrors({
				invalid: error,
			});
		}
	});
}
