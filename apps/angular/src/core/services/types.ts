import { Pagination } from '@js-camp/core/models/pagintation';
import { Observable } from 'rxjs';

export interface HttpService<R, T> {
	get(params: T): Observable<Pagination<R>> | Observable<null>;
	create(params: T): Observable<R>;
}
