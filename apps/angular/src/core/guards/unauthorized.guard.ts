import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Unauthorized guard. */
export const UnauthorizedGuard: CanActivateFn = () => {
	const userService = inject(UserService);
	const router = inject(Router);

	return userService.isAuthorized$.pipe(
		map(isAuthorized => (isAuthorized ? router.parseUrl('/auth/login') : true)),
	);
};
