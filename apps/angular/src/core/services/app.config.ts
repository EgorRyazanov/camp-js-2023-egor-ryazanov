import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** App config. */
@Injectable({
	providedIn: 'root',
})
export class AppConfig {
	/** API key. */
	public readonly apiKey = environment.apiKey;

	/** API url. */
	public readonly apiUrl = environment.apiUrl;
}
