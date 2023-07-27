import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

/** Login page. */
@Component({
	selector: 'camp-login',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css', '../auth.css'],
})
export class RegisterComponent {
	/** Is app loading. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Register form. */
	protected readonly registerForm: FormGroup;

	private readonly fb = inject(NonNullableFormBuilder);

	// private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		this.registerForm = this.initRegisterForm();
	}

	/**
	 * Handle 'submit' of the login form.
	 */
	protected onSubmit(): void {
		// this.userService.login(loginData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}

	private initRegisterForm(): FormGroup {
		return this.fb.group({
			email: this.fb.control('', [Validators.required, Validators.email]),
			firstName: this.fb.control('', [Validators.required]),
			lastName: this.fb.control('', [Validators.required]),
			password: this.fb.control('', Validators.required),
			repeatPassword: this.fb.control('', Validators.required),
		});
	}
}
