import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

/** Error interceptor. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					console.error(`Status: ${error.status}; Message: ${error.message}`);
				}
				return throwError(() => error);
			}),
		);
	}
}
