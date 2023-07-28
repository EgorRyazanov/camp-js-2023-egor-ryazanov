import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
	userService = inject(UserService);
	router = inject(Router);

	canActivate(): Observable<boolean | UrlTree> {
		return this.userService.isAuthorized$.pipe(
			map((isAuthorized) => (isAuthorized ? this.router.parseUrl('/') : true))
		);
	}
}
