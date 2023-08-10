import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Registration } from '@js-camp/core/models/auth/registration';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';
import { UserSecretMapper } from '@js-camp/core/mappers/auth/user-secret.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { LoginDataMapper } from '@js-camp/core/mappers/auth/login-data.mapper';
import { RegistrationDataMapper } from '@js-camp/core/mappers/auth/register-data.mapper';

import { AppErrorMapper } from '../utils/app-error.mapper';

import { UrlService } from './url.service';

/** Auth API. */
@Injectable({ providedIn: 'root' })
export class AuthApiService {
	/** HTTP client. */
	private readonly httpClient = inject(HttpClient);

	/**	API URL service. */
	private readonly apiUrlService = inject(UrlService);

	/** Login mapper. */
	private readonly LoginMapper = inject(LoginDataMapper);

	/** Register mapper. */
	private readonly RegistrationDataMapper = inject(RegistrationDataMapper);

	/** App error mapper. */
	private readonly appErrorMapper = inject(AppErrorMapper);

	/**
	 * Register a user.
	 * @param registerData Register data.
	 */
	public register(registerData: Registration): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecret>(this.apiUrlService.authUrls.register, this.RegistrationDataMapper.toDto(registerData))
			.pipe(
				map(secretDto => UserSecretMapper.fromDto(secretDto)),
				this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(this.RegistrationDataMapper),
			);
	}

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.httpClient.post<UserSecret>(this.apiUrlService.authUrls.login, this.LoginMapper.toDto(loginData)).pipe(
			map(secretDto => UserSecretMapper.fromDto(secretDto)),
			this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(this.LoginMapper),
		);
	}

	/**
	 * Refresh user's secret.
	 * @param secret Secret data.
	 */
	public refreshSecret(secret: UserSecret): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecret>(this.apiUrlService.authUrls.refreshToken, UserSecretMapper.toDto(secret))
			.pipe(map(secretDto => UserSecretMapper.fromDto(secretDto)));
	}
}
