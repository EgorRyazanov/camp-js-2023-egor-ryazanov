import { inject, Injectable } from '@angular/core';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

import { StorageService } from './storage.service';

const USER_SECRET_STORAGE_KEY = 'user';

/** User secret storage. */
@Injectable({ providedIn: 'root' })
export class UserSecretStorageService {
	/** Token info for current user. */
	public readonly currentSecret$: Observable<UserSecret | null>;

	/** Storage service. */
	private readonly storageService = inject(StorageService);

	/** Flag to update key in storage. */
	private shouldUpdateKeyInStorage$ = new BehaviorSubject<void>(undefined);

	public constructor() {
		this.currentSecret$ = this.shouldUpdateKeyInStorage$.pipe(
			switchMap(() => this.storageService.get<UserSecret | null>(USER_SECRET_STORAGE_KEY)),
		);
	}

	/**
	 * Saves a secret.
	 * @param secret Secret to save.
	 */
	public saveSecret(secret: UserSecret): Observable<UserSecret> {
		return this.storageService.save(USER_SECRET_STORAGE_KEY, secret).pipe(
			map(() => {
				this.shouldUpdateKeyInStorage$.next();
				return secret;
			}),
		);
	}

	/** Removes current secret. */
	public removeSecret(): Observable<void> {
		return this.storageService.remove(USER_SECRET_STORAGE_KEY).pipe(tap(() => this.shouldUpdateKeyInStorage$.next()));
	}
}
