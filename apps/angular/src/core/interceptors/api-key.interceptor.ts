import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';

/** Api Key Interceptor. */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const modifiedReq = request.clone({
			headers: request.headers.set('Api-Key', environment.apiKey),
		});
		return next.handle(modifiedReq);
	}
}
