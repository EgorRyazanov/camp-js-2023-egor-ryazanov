import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Router } from '@angular/router';

/** Error interceptor. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	public constructor(private readonly router: Router) {}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: unknown) => {
				this.router.navigate(['/error']);
				if (error instanceof HttpErrorResponse) {
					return throwError(() => new Error(`Status: ${error.status}; Message: ${error.message}`));
				}
				return throwError(() => error);
			})
		);
	}
}
