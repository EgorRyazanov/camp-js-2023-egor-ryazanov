import { Injectable, inject } from '@angular/core';

import { AppConfig } from './app.config';
import { AUTO_STYLE } from '@angular/animations';

/** URL service. */
@Injectable({
	providedIn: 'root',
})
export class UrlService {
	/** App config. */
	private readonly appConfig = inject(AppConfig);

	/** Authorization urls. */
	public readonly authUrls = {
		login: this.generateURL('/api/v1/auth/login/'),
		register: this.generateURL('/api/v1/auth/register/'),
		refreshToken: this.generateURL('/api/v1/auth/token/refresh/'),
	} as const;

	/** Anime urls. */
	public readonly animeUrls = {
		animes: this.generateURL('/api/v1/anime/anime/'),
	} as const;

	public isAuthUrl(value: string): boolean {
		return Object.values(this.authUrls).includes(value);
	}

	public isAnimeUrl(value: string): boolean {
		return Object.values(this.animeUrls).includes(value);
	}

	/**
	 * Generates URI.
	 * @param pathname Pathname.
	 */
	private generateURL(pathname: URL | string): string {
		return new URL(pathname, this.appConfig.apiUrl).toString();
	}
}
