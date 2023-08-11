import { Injectable, inject } from '@angular/core';

import { AppConfig } from './app.config';

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
		animesDetail: (id: string) => this.generateURL(`/api/v1/anime/anime/${id}/`),
	} as const;

	public readonly genresUrls = {
		genres: this.generateURL('/api/v1/anime/genres/'),
	};

	/**
	 * Checks URL for accordance auth URLs.
	 * @param url URL to check.
	 */
	public isAuthUrl(url: string): boolean {
		return Object.values(this.authUrls).includes(url);
	}

	/**
	 * Checks URL for accordance anime URLs.
	 * @param url URL to check.
	 */
	public isAnimeUrl(url: string): boolean {
		return url.startsWith(this.animeUrls.animes);
	}

	/**
	 * Checks URL for accordance genres URLs.
	 * @param url URL to check.
	 */
	public isGenresUrl(url: string): boolean {
		return url.startsWith(this.genresUrls.genres);
	}

	/**
	 * Generates URI.
	 * @param pathname Pathname.
	 */
	private generateURL(pathname: URL | string): string {
		return new URL(pathname, this.appConfig.apiUrl).toString();
	}
}
