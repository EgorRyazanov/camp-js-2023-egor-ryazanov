import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Authorized guard. */
export const authorizedGuard: CanActivateFn = () => {
	const userService = inject(UserService);
	const router = inject(Router);

	return userService.isAuthorized$.pipe(
		map((isAuthorized) => {
			if (!isAuthorized) {
				return router.parseUrl('/auth/login');
			}

			return isAuthorized;
		})
	);
};
