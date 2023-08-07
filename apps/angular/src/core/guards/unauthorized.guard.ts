import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Unauthorized guard. */
export const unAuthorizedGuard: CanActivateFn = () => {
	const userService = inject(UserService);
	const router = inject(Router);

	return userService.isAuthorized$.pipe(
		tap(isAuthorized => (isAuthorized ? router.parseUrl('/') : true)),
	);
};
