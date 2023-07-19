import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Base Headers Interceptor. */
@Injectable()
export class BaseHeadersInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const modifiedReq = request.clone({
			headers: request.headers.set('Content-Type', 'application/json'),
		});
		return next.handle(modifiedReq);
	}
}
