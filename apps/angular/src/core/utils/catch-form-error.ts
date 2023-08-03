import { FormGroup } from '@angular/forms';
import { AppError } from '@js-camp/core/models/app-error';
import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';

/**
 * Caches form errors.
 * @param form Form for set errors to it.
 */
export function catchFormErrors<T>(form: FormGroup): OperatorFunction<T, T> {
	return (source$: Observable<T>) =>
		source$.pipe(
			catchError((errors: unknown) => {
				if (errors instanceof AppError) {
					Object.keys(form.controls).forEach((key) => {
						form.controls[key].updateValueAndValidity();
						if (errors.validationErrors.hasOwnProperty(key)) {
							form.controls[key].setErrors(errors.validationErrors[key]);
						}
					});
				}

				return throwError(() => errors);
			})
		);
}
