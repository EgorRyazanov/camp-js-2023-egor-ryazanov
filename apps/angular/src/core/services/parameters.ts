import { inject } from '@angular/core';
import { Params, Router } from '@angular/router';

/** Parameter service. */
export class ParametersService<T extends Params> {
	/** Router. */
	private router = inject(Router);

	public constructor(private changableParams: T, private readonly baseUrl: string) {}

	/**
	 * Changes current params.
	 * @param values New params.
	 * @param isRerendable Needs to rerender.
	 */
	public changeParams(values: Partial<T>, isRerendable = true): void {
		this.changableParams = { ...this.changableParams, ...values };
		if (isRerendable) {
			this.setQueryParams();
		}
	}

	/** Gets params. */
	public getParams(): T {
		return this.changableParams;
	}

	/** Sets query params. */
	private setQueryParams(): void {
		this.router.navigate([this.baseUrl], { queryParams: this.changableParams });
	}
}
