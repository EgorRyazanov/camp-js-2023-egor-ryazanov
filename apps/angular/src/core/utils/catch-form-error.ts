import { FormGroup } from '@angular/forms';
import { AppError } from '@js-camp/core/models/app-error';
import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';

export function catchFormErrors<T>(form: FormGroup): OperatorFunction<T, T> {
	return (source$: Observable<T>) =>
		source$.pipe(
			catchError((errors) => {
				if (errors instanceof Array) {
					const commonErrors: AppError[] = [];
					errors.forEach((error) => {
						if (error instanceof AppError) {
							if (form.contains(error.key)) {
								form.controls[error.key].setErrors({ invalid: error.message });
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
