import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Observable } from 'rxjs';
import { DestroyRef } from '@angular/core';

@Component({
	selector: 'camp-base-page',
	templateUrl: './base-page.component.html',
	styleUrls: ['./base-page.component.css'],
})
export class BasePageComponent {
	private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	protected readonly isAuthorized$: Observable<boolean>;

	constructor() {
		this.isAuthorized$ = this.userService.isAuthorized$;
	}

	protected handleLogout() {
		this.userService.logout().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}
}
