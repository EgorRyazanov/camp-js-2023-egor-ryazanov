import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { BehaviorSubject } from 'rxjs';

/** Login page. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css', '../auth.css'],
})
export class LoginComponent {
	/** Is app loading. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Login form. */
	protected readonly loginForm: FormGroup;

	private readonly fb = inject(NonNullableFormBuilder);

	private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly router = inject(Router);

	public constructor() {
		this.loginForm = this.initLoginForm();
	}

	/**
	 * Handle 'submit' of the login form.
	 */
	protected onSubmit(): void {
		this.isLoading$.next(true);
		this.userService
			.login(this.loginForm.value)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.isLoading$.next(false);
				this.router.navigate(['/']);
			});
	}

	private initLoginForm(): FormGroup {
		return this.fb.group({
			email: this.fb.control('user@example.com', [Validators.required, Validators.email]),
			password: this.fb.control('qwertyu123blablabla', Validators.required),
		});
	}
}
