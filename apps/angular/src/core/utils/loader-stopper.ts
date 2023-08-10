import { BehaviorSubject, Observable, OperatorFunction, tap } from 'rxjs';

/**
 * Stops loading status.
 * @param isLoading$ Status.
 */
export function stopLoadingStatus<T>(isLoading$: BehaviorSubject<boolean>): OperatorFunction<T, T> {
	return (source$: Observable<T>) =>
		source$.pipe(
			tap({ next: () => isLoading$.next(false), error: () => isLoading$.next(false) }),
		);
}
