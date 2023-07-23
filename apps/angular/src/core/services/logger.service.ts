import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** Logger Service. */
@Injectable({
	providedIn: 'root',
})
export class LoggerService {
	/** Errors. */
	private readonly errors: HttpErrorResponse[] = [];

	/**
	 * Saves errors.
	 * @param error Error.
	 */
	public save(error: HttpErrorResponse): void {
		this.errors.push(error);
	}
}
