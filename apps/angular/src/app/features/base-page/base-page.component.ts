import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Observable } from 'rxjs';

/** Base page. */
@Component({
	selector: 'camp-base-page',
	templateUrl: './base-page.component.html',
	styleUrls: ['./base-page.component.css'],
})
export class BasePageComponent {
	/** User service. */
	private readonly userService = inject(UserService);

	/** Destroy ref. */
	private readonly destroyRef = inject(DestroyRef);

	/** Is user authorized. */
	protected readonly isAuthorized$: Observable<boolean>;

	public constructor() {
		this.isAuthorized$ = this.userService.isAuthorized$;
	}

	/** User logouts. */
	protected handleLogout(): void {
		this.userService.logout().pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
