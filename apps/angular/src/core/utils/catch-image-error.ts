import { HttpErrorResponse } from '@angular/common/http';
import { catchError, OperatorFunction, throwError } from 'rxjs';
import { xml2js } from 'xml-js';

interface ErrorText {

	/** Error. */
	readonly ['Error']: {

		/** Message. */
		readonly ['Message']: {

			/** Text of error message. */
			readonly ['_text']: string;
		};
	};
}

/** Catches image XML errors and converts it to default HttpErrorResponse. */
export function catchImageError<T>(): OperatorFunction<T, T> {
	return catchError((error: unknown) => {
		if (error instanceof HttpErrorResponse) {
			const erorrResponse = xml2js(error.error, { compact: true }) as ErrorText;
			return throwError(
				() =>
					new HttpErrorResponse({
						status: error.status,
						statusText: error.statusText,
						headers: error.headers,
						url: error.url ?? '',
						error: {
							errors: [
								{
									attr: 'image',
									code: 'invalid',
									detail: erorrResponse.Error.Message._text,
								},
							],
						},
					}),
			);
		}

		return throwError(() => error);
	});
}
