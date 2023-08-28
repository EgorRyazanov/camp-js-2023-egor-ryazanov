import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AppError } from '@js-camp/core/models/app-error';

/** Params service. */
@Injectable()
export class ParamsService {
	/** ID. */
	public readonly id$;

	private readonly activeRoute = inject(ActivatedRoute);

	public constructor() {
		this.id$ = this.getId();
	}

	/** Gets ID. */
	public getId(): Observable<number> {
		return this.activeRoute.paramMap.pipe(map(params => {
			const id = Number(params.get('id'));
			if (Number.isNaN(id)) {
				throw new AppError(`id - ${id} is incorrect`);
			}

			return id;
		}));
	}
}
