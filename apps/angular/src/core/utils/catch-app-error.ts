import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMapper } from '@js-camp/core/mappers/error.mapper';

export function catchAppErrors<T>(): OperatorFunction<T, T> {
	return (source$: Observable<T>) =>
		source$.pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse && error?.error?.errors instanceof Array) {
					return throwError(() => ErrorMapper.fromDto(error.error.errors));
				}
				return throwError(() => error);
			})
		);
}
