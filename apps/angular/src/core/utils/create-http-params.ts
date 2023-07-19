import { HttpParams } from '@angular/common/http';

/**
 * Create http parameters based on any object. Skips undefined elements.
 * @param params object with possible http parameters.
 */
export function createHttpParams(params: { [key in string]: any }): HttpParams {
	let httpParams: HttpParams = new HttpParams();
	Object.keys(params).forEach((param) => {
		if (params[param]) {
			httpParams = httpParams.set(param, params[param]);
		}
	});

	return httpParams;
}
