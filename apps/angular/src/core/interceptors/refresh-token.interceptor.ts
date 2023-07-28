import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpStatusCode,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { UrlService } from '../services/url.service';
import { UserService } from '../services/user.service';

/** Catches requests with outdated tokens and attempts to refresh it and then retry the request. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
	/** Active request for token refresh. */
	private refreshSecretRequest$: Observable<void> | null = null;

	private readonly userService = inject(UserService);

	private readonly apiUrlsConfig = inject(UrlService);

	/** @inheritdoc */
	public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!this.shouldRefreshTokenForUrl(req.url)) {
			return next.handle(req);
		}

		return next.handle(req).pipe(
			catchError((error) => {
				if (this.shouldHttpErrorBeIgnored(error)) {
					return throwError(() => error);
				}
				this.refreshSecretRequest$ ??= this.userService.refreshSecret();

				return this.refreshSecretRequest$.pipe(
					tap(() => {
						this.refreshSecretRequest$ = null;
					}),
					switchMap(() => next.handle(req))
				);
			})
		);
	}

	private shouldHttpErrorBeIgnored(error: HttpErrorResponse): boolean {
		return error.status !== HttpStatusCode.Unauthorized;
	}

	private shouldRefreshTokenForUrl(url: string): boolean {
		return !this.apiUrlsConfig.isAuthUrl(url) && this.apiUrlsConfig.isAnimeUrl(url);
	}
}
