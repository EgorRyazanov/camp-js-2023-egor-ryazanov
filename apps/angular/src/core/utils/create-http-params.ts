import { HttpParams } from '@angular/common/http';

/**
 * Create http parameters based on any object. Skips undefined elements.
 * @param params Object with possible http parameters.
 */
// Made it because parameter of object can be any element including my own types.
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function createHttpParams(params: { [key in string]: any }): HttpParams {
	let httpParams: HttpParams = new HttpParams();
	Object.keys(params).forEach((param) => {
		if (params[param]) {
			if (params[param] instanceof Array) {
				params[param].forEach((parameter: any) => {
					httpParams = httpParams.append(param, parameter);
				});
			} else {
				httpParams = httpParams.set(param, params[param]);
			}
		}
	});

	return httpParams;
}
