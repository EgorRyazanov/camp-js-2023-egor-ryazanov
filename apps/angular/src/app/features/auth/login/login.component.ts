import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Login form. */
	protected readonly loginForm: FormGroup;

	private readonly fb = inject(NonNullableFormBuilder);

	private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		this.loginForm = this.initLoginForm();
	}

	/**
	 * Handle 'submit' of the login form.
	 */
	protected onSubmit(): void {
		console.log(123);
		this.userService.login(this.loginForm.value).subscribe();
	}

	private initLoginForm(): FormGroup {
		return this.fb.group({
			email: this.fb.control('user@example.com', [Validators.required, Validators.email]),
			password: this.fb.control('qwertyu123blablabla', Validators.required),
		});
	}
}
