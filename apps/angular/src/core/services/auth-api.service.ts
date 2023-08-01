import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Register } from '@js-camp/core/models/auth/register';
import { RegisterMapper } from '@js-camp/core/mappers/auth/register.mapper';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';
import { UserSecretMapper } from '@js-camp/core/mappers/auth/user-secret.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';

import { catchAppErrors } from '../utils/catch-app-error';

import { UrlService } from './url.service';

/** Auth API. */
@Injectable({ providedIn: 'root' })
export class AuthApiService {
	/** HTTP client. */
	private readonly httpClient = inject(HttpClient);

	/**	API URL service. */
	private readonly apiUrlService = inject(UrlService);

	/**
	 * Register a user.
	 * @param registerData Register data.
	 */
	public register(registerData: Register): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecret>(this.apiUrlService.authUrls.register, RegisterMapper.toDto(registerData))
			.pipe(
				map(secretDto => UserSecretMapper.fromDto(secretDto)),
				catchAppErrors(),
			);
	}

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.httpClient.post<UserSecret>(this.apiUrlService.authUrls.login, LoginMapper.toDto(loginData)).pipe(
			map(secretDto => UserSecretMapper.fromDto(secretDto)),
			catchAppErrors(),
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
