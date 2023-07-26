import { Injectable, inject } from '@angular/core';
import { AppConfig } from './app.config';

/** URL service. */
@Injectable({
	providedIn: 'root',
})
export class UrlService {
	/** App config. */
	private readonly appConfig = inject(AppConfig);
	/**
	 * Generates URI.
	 * @param pathname Pathname.
	 */
	public generateURL(pathname: URL | string): string {
		return new URL(pathname, this.appConfig.apiUrl).toString();
	}
}
