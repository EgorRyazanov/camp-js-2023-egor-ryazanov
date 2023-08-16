import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { ControlsOf } from '@js-camp/angular/core/utils/types/controls-of';
import { Login } from '@js-camp/core/models/auth/login';
import { BehaviorSubject } from 'rxjs';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';

import { MIN_PASSWORD_LENGTH } from '../utils/constants';

type LoginForm = ControlsOf<Login>;

/** Login page. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['../auth.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Login form. */
	protected readonly loginForm: FormGroup<LoginForm>;

	/** Form builder. */
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** User service. */
	private readonly userService = inject(UserService);

	/** Destroy ref. */
	private readonly destroyRef = inject(DestroyRef);

	/** Router. */
	private readonly router = inject(Router);

	public constructor() {
		this.loginForm = this.initLoginForm();
	}

	/** Handle 'submit' of the login form. */
	protected onSubmit(): void {
		this.loginForm.markAllAsTouched();
		if (this.loginForm.invalid) {
			return;
		}

		this.isLoading$.next(true);
		this.userService
			.login(this.loginForm.getRawValue())
			.pipe(catchFormErrors(this.loginForm), stopLoadingStatus(this.isLoading$), takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.router.navigate(['/']);
			});
	}

	/**
	 * Checks is conrols has required error.
	 * @param controlName Name of control that need to be checked.
	 */
	protected hasRequiredError(controlName: keyof LoginForm): boolean {
		return this.loginForm.controls[controlName].hasError('required');
	}

	/** Checks is password has min length error. */
	protected get hasPasswordMinLengthError(): boolean {
		return this.loginForm.controls.password.hasError('minlength');
	}

	/** Checks validity of email . */
	protected get isEmailValid(): boolean {
		return this.loginForm.controls.email.hasError('email');
	}

	/**
	 * Checks is conrols has server error.
	 * @param controlName Name of control that need to be checked.
	 */
	protected getGeneralFieldErrors(controlName: keyof LoginForm): string | null {
		if (this.loginForm.controls[controlName].hasError('invalid')) {
			return this.loginForm.controls[controlName].getError('invalid');
		}

		return null;
	}

	/** Initialize register form. */
	private initLoginForm(): FormGroup<LoginForm> {
		return this.formBuilder.group<LoginForm>({
			email: this.formBuilder.control('', [Validators.required, Validators.email]),
			password: this.formBuilder.control('', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]),
		});
	}
}
