import { HttpParams, HttpParamsOptions } from '@angular/common/http';

/**
 * Create http parameters based on any object. Skips undefined elements.
 * @param params Object with possible http parameters.
 */
// Made it because parameter of object can be any element including my own types.
export function createHttpParams(params: NonNullable<HttpParamsOptions['fromObject']>): HttpParams {
	let httpParams: HttpParams = new HttpParams();
	Object.keys(params).forEach(param => {
		const parameter = params[param];
		if (parameter) {
			if (parameter instanceof Array) {
				httpParams = httpParams.append(param, parameter.join(', '));
			} else {
				httpParams = httpParams.set(param, parameter);
			}
		}
	});

	return httpParams;
}
