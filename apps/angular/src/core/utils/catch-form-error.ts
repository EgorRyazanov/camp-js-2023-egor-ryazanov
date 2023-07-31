import { FormGroup } from '@angular/forms';
import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';

export function catchFormErrors<T>(form: FormGroup): OperatorFunction<T, T> {
	return (source$: Observable<T>) =>
		source$.pipe(
			catchError((error) => {
				console.log(form.controls);
				return throwError(() => error);
			})
		);
}
