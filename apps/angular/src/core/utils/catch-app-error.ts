import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMapper } from '@js-camp/core/mappers/error.mapper';

/** Catches custom app errors. */
export function catchAppErrors<T>(): OperatorFunction<T, T> {
	return (source$: Observable<T>) =>
		source$.pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse && error?.error?.errors instanceof Array) {
					return throwError(() => new HttpErrorResponse({ error: ErrorMapper.fromDto(error.error.errors) }));
				}
				return throwError(() => error);
			}),
		);
}
