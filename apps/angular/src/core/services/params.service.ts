import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

/** Params service. */
@Injectable()
export class ParamsService {
	private readonly activeRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	/**
	 * Gets ID.
	 * @param homeUrl Home URL.
	 */
	public getId(homeUrl: string): Observable<number> {
		return this.activeRoute.paramMap.pipe(map(params => {
			const id = Number(params.get('id'));
			if (Number.isNaN(id)) {
				this.router.navigateByUrl(homeUrl);
			}

			return id;
		}));
	}
}
