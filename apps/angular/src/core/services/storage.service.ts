import { Injectable } from '@angular/core';
import { Observable, Subject, defer, of } from 'rxjs';

/**
 * Storage service. Uses `localStorage` underhood.
 */
@Injectable({
	providedIn: 'root',
})
export class StorageService {
	/**
	 * Save data to storage.
	 * @param key Key.
	 * @param data Data for save.
	 */
	public save<T>(key: string, data: T): Observable<void> {
		return defer(() => {
			localStorage.setItem(key, JSON.stringify(data));

			return of(undefined);
		});
	}

	/** Clears local storage. */
	public clear(): Observable<void> {
		return defer(() => {
			localStorage.clear();

			return of(undefined);
		});
	}
	/**
	 * Get item from storage by key.
	 * @param key Key.
	 * @param schema Schema to parse unsafe data from the local storage.
	 */
	public get<T>(key: string): Observable<T | null> {
		return defer(() => {
			const value = localStorage.getItem(key);
			if (value) {
				return of((async () => await JSON.parse(value)) as T);
			}

			return of(null);
		});
	}

	/**
	 * Removed data from storage.
	 * @param key Key.
	 */
	public remove(key: string): Observable<void> {
		return defer(() => {
			localStorage.removeItem(key);

			return of(undefined);
		});
	}
}
