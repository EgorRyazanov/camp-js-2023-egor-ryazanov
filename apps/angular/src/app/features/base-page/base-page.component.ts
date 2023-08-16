import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Observable } from 'rxjs';

/** Base page. */
@Component({
	selector: 'camp-base-page',
	templateUrl: './base-page.component.html',
	styleUrls: ['./base-page.component.css'],
})
export class BasePageComponent {
	/** Is user authorized. */
	protected readonly isAuthorized$: Observable<boolean>;

	/** User service. */
	private readonly userService = inject(UserService);

	/** Destroy ref. */
	private readonly destroyRef = inject(DestroyRef);

	/** Router. */
	private readonly router = inject(Router);

	public constructor() {
		this.isAuthorized$ = this.userService.isAuthorized$;
	}

	/** User logouts. */
	protected handleLogout(): void {
		this.userService
			.logout()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.router.navigate(['auth/login']);
			});
	}
}
