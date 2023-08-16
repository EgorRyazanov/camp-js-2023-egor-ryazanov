import { BehaviorSubject, Observable, OperatorFunction, tap } from 'rxjs';

/**
 * Starts loading status.
 * @param isLoading$ Status.
 */
export function startLoadingStatus<T>(isLoading$: BehaviorSubject<boolean>): OperatorFunction<T, T> {
	return (source$: Observable<T>) => source$.pipe(tap({ next: () => isLoading$.next(true) }));
}
