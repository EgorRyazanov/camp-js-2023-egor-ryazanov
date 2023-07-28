import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

export const unAuthorizedGuard: CanActivateFn = () => {
	const userService = inject(UserService);
	const router = inject(Router);
	return userService.isAuthorized$.pipe(
		map((isAuthorized) => {
			console.log(isAuthorized);
			return isAuthorized ? router.parseUrl('/') : true;
		})
	);
};
