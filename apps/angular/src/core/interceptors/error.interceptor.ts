import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

import { Router } from '@angular/router';

import { LoggerService } from '../services/logger.service';

/** Error interceptor. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	public constructor(private readonly logger: LoggerService, private readonly router: Router) {}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			retry(3),
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					this.logger.save(error);
					return throwError(() => new Error(`Status: ${error.status}; Message: ${error.message}`));
				}
				this.router.navigate(['/error']);
				return throwError(() => new Error(`Status: ${error.status}; Message: ${error.message}`));
			}),
		);
	}
}
