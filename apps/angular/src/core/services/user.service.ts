import { inject, Injectable } from '@angular/core';
import { catchError, concat, first, map, merge, Observable, OperatorFunction, pipe, switchMap, throwError } from 'rxjs';
import { Login } from '@js-camp/core/models/auth/login';
import { Registration } from '@js-camp/core/models/auth/registration';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';

import { AuthApiService } from './auth-api.service';
import { UserSecretStorageService } from './user-secret-storage.service';

/**
 * Stateful service for storing/managing information about the current user.
 */
@Injectable({
	providedIn: 'root',
})
export class UserService {
	/** Whether the current user is authorized. */
	public readonly isAuthorized$: Observable<boolean>;

	/** Auth service. */
	private readonly authService = inject(AuthApiService);

	/** User secret storage. */
	private readonly userSecretStorage = inject(UserSecretStorageService);

	public constructor() {
		this.isAuthorized$ = this.initCurrentUserStream();
	}

	/**
	 * Login a user with.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<void> {
		return this.authService.login(loginData).pipe(this.saveSecretAndWaitForAuthorized());
	}

	/**
	 * Register a user.
	 * @param registerData Register data.
	 */
	public register(registerData: Registration): Observable<void> {
		return this.authService.register(registerData).pipe(this.saveSecretAndWaitForAuthorized());
	}

	/** Logout current user. */
	public logout(): Observable<void> {
		return this.userSecretStorage.removeSecret();
	}

	/** Attempts to refresh user secret, in case it is not possible logs out current user.. */
	public refreshSecret(): Observable<void> {
		const refreshSecretIfPresent$ = this.userSecretStorage.currentSecret$.pipe(
			first(),
			switchMap(secret => {
				if (secret != null) {
					return this.authService.refreshSecret(secret);
				}
				return throwError(() => new Error('Unauthorized'));
			}),
			switchMap(newSecret => this.userSecretStorage.saveSecret(newSecret)),
		);
		return refreshSecretIfPresent$.pipe(
			catchError((error: unknown) =>
				concat(
					this.logout(),
					throwError(() => error),
				)),
			map(() => undefined),
		);
	}

	/** Saves secrets and wait for auth flag. */
	private saveSecretAndWaitForAuthorized(): OperatorFunction<UserSecret, void> {
		return pipe(
			switchMap(secret => {
				const saveUserSecretSideEffect$ = this.userSecretStorage.saveSecret(secret);
				return merge(this.isAuthorized$, saveUserSecretSideEffect$);
			}),
			first(Boolean),
			map(() => undefined),
		);
	}

	/** Init current user stream. */
	private initCurrentUserStream(): Observable<boolean> {
		return this.userSecretStorage.currentSecret$.pipe(map(secret => secret != null));
	}
}
