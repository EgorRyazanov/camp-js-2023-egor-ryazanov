import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';

import { AppConfig } from '../services/app.config';
import { UserSecretStorageService } from '../services/user-secret-storage.service';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

/** Adds JWT to requests using Authorization HTTP header. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	/** App config service. */
	private readonly appConfigService = inject(AppConfig);

	/** User secret storage. */
	private readonly userSecretStorage = inject(UserSecretStorageService);

	/** @inheritdoc */
	public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.shouldInterceptToken(req.url)) {
			return this.userSecretStorage.currentSecret$.pipe(
				first(),
				map(userSecret =>
					userSecret ? req.clone({ headers: this.appendAuthorizationHeader(req.headers, userSecret) }) : req),
				switchMap(newReq => next.handle(newReq)),
			);
		}
		return next.handle(req);
	}

	/**
	 * Checks if a request is for authorization or refresh token.
	 * @param url - Request url.
	 */
	private shouldInterceptToken(url: string): boolean {
		return url.startsWith(this.appConfigService.apiUrl.toString());
	}

	/**
	 * Appends authorization header to a list of `headers`.
	 * @param headers Headers list.
	 * @param userSecret User secret.
	 */
	private appendAuthorizationHeader(headers: HttpHeaders, userSecret: UserSecret): HttpHeaders {
		// console.log9)
		return headers.set(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${userSecret.accessToken}`);
	}
}
