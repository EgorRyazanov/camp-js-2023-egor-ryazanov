import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Login } from '../models/login';
import { UserSecret } from '../models/user-secret';

import { UrlService } from './url.service';
import { AppErrorMapper } from './mappers/app-error.mapper';
import { userSecretDtoSchema } from './mappers/dto/user-secret.dto';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { UserSecretDataMapper } from './mappers/user-secret-data.mapper';
import { Register } from '@js-camp/core/models/auth/register';
import { RegisterMapper } from '@js-camp/core/mappers/auth/register.mapper';

/**
 * Performs CRUD operations for auth-related information.
 */
@Injectable({ providedIn: 'root' })
export class AuthApiService {
	private readonly httpClient = inject(HttpClient);

	private readonly apiUrlService = inject(UrlService);

	private readonly appErrorMapper = inject(AppErrorMapper);

	private readonly userSecretMapper = inject(UserSecretDataMapper);

	public register(registerData: Register): Observable<UserSecret> {
		return this.httpClient.post<unknown>(this.apiUrlService.authUrls.register, RegisterMapper.toDto(registerData)).pipe(
			map((response) => .),
			map((secretDto) => this.userSecretMapper.fromDto(secretDto)),
			this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(this.loginDataMapper)
		);
	}

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.httpClient.post<unknown>(this.apiUrlsConfig.auth.login, this.loginDataMapper.toDto(loginData)).pipe(
			map((response) => userSecretDtoSchema.parse(response)),
			map((secretDto) => this.userSecretMapper.fromDto(secretDto)),
			this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(this.loginDataMapper)
		);
	}

	// /**
	//  * Refresh user's secret.
	//  * @param secret Secret data.
	//  */
	// public refreshSecret(secret: UserSecret): Observable<UserSecret> {
	// 	return this.httpClient
	// 		.post<unknown>(this.apiUrlsConfig.auth.refreshSecret, this.userSecretMapper.toDto(secret))
	// 		.pipe(
	// 			map((response) => userSecretDtoSchema.parse(response)),
	// 			map((secretDto) => this.userSecretMapper.fromDto(secretDto)),
	// 			this.appErrorMapper.catchHttpErrorToAppError()
	// 		);
	// }
}
