import { FormGroup } from '@angular/forms';
import { AppError } from '@js-camp/core/models/app-error';
import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';

export function catchFormErrors<T>(form: FormGroup): OperatorFunction<T, T> {
	return (source$: Observable<T>) =>
		source$.pipe(
			catchError((errors) => {
				if (errors instanceof Array) {
					const commonErrors: AppError[] = [];
					Object.keys(form.controls).forEach(key => {
						form.controls[key].updateValueAndValidity();
					});
					errors.forEach((error) => {
						if (error instanceof AppError) {
							if (form.contains(error.key)) {
								const formErrors = form.controls[error.key].getError('invalid') ?? [];
								form.controls[error.key].setErrors({ invalid: [...formErrors, error.message] });
							} else {
								commonErrors.push(error);
							}
						}
					});
					errors = commonErrors;
				}
				return throwError(() => errors);
			})
		);
}
