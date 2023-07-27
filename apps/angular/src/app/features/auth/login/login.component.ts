import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

/** Login page. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css', '../auth.css'],
})
export class LoginComponent {
	/** Is app loading. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Login form. */
	protected readonly loginForm: FormGroup;

	private readonly fb = inject(NonNullableFormBuilder);

	// private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		this.loginForm = this.initLoginForm();
	}

	/**
	 * Handle 'submit' of the login form.
	 */
	protected onSubmit(): void {
		// this.userService.login(loginData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}

	private initLoginForm(): FormGroup {
		return this.fb.group({
			email: this.fb.control('', [Validators.required, Validators.email]),
			password: this.fb.control('', Validators.required),
		});
	}
}
