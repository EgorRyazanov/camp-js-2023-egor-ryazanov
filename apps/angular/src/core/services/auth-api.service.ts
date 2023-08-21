import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDataMapper } from '@js-camp/core/mappers/auth/login-data.mapper';
import { RegistrationDataMapper } from '@js-camp/core/mappers/auth/register-data.mapper';
import { Observable, map } from 'rxjs';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';
import { Registration } from '@js-camp/core/models/auth/registration';
import { UserSecretDto } from '@js-camp/core/dtos/auth-dto/user-secret-dto';
import { UserSecretMapper } from '@js-camp/core/mappers/auth/user-secret.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { AppErrorMapper } from '../utils/app-error.mapper';
import { UrlService } from './url.service';

/** Auth API. */
@Injectable({ providedIn: 'root' })
export class AuthApiService {
	private readonly httpClient = inject(HttpClient);

	private readonly apiUrlService = inject(UrlService);

	private readonly loginMapper = inject(LoginDataMapper);

	private readonly registrationDataMapper = inject(RegistrationDataMapper);

	private readonly appErrorMapper = inject(AppErrorMapper);

	/**
	 * Register a user.
	 * @param registerData Register data.
	 */
	public register(registerData: Registration): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.apiUrlService.authUrls.register, this.registrationDataMapper.toDto(registerData))
			.pipe(
				map((secretDto) => UserSecretMapper.fromDto(secretDto)),
				this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(this.registrationDataMapper)
			);
	}

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.apiUrlService.authUrls.login, this.loginMapper.toDto(loginData))
			.pipe(
				map((secretDto) => UserSecretMapper.fromDto(secretDto)),
				this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(this.loginMapper)
			);
	}

	/**
	 * Refresh user's secret.
	 * @param secret Secret data.
	 */
	public refreshSecret(secret: UserSecret): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.apiUrlService.authUrls.refreshToken, UserSecretMapper.toDto(secret))
			.pipe(map((secretDto) => UserSecretMapper.fromDto(secretDto)));
	}
}
