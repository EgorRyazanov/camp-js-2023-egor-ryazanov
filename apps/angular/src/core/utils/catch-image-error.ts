import { HttpErrorResponse } from '@angular/common/http';
import { catchError, OperatorFunction, throwError } from 'rxjs';
import { xml2js } from 'xml-js';

/** Catches image XML errors. */
export function catchImageError<T>(): OperatorFunction<T, T> {
	return catchError((error: unknown) => {
		if (error instanceof HttpErrorResponse) {
			const erorrResponse = xml2js(error.error, { compact: true });
			if ('Error' in erorrResponse) {
				const error = erorrResponse['Error'];
				if ('Message' in error) {
					const detail = error['Message'];
					if ('_text' in detail) {
						return throwError(
							() =>
								new HttpErrorResponse({
									...error,
									message: error.message,
									error: {
										errors: [
											{
												attr: 'image',
												detail: detail['_text'],
											},
										],
									},
								})
						);
					}
				}
			}
		}

		return throwError(() => error);
	});
}
