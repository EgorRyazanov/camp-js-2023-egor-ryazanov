import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** URL service. */
@Injectable({
	providedIn: 'root',
})
export class UrlService {
	/**
	 * Generates URI.
	 * @param pathname Pathname.
	 */
	public generateURI(pathname: URL | string): string {
		return new URL(pathname, environment.baseUrl).toString();
	}
}
