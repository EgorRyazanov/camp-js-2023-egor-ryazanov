import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { ControlsOf } from '@js-camp/angular/core/utils/types/controls-of';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { Login } from '@js-camp/core/models/auth/login';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';

import { MIN_PASSWORD_LENGTH } from '../utils/constants';

type LoginForm = ControlsOf<Login>;

/** Login page. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['../auth.css'],
})
export class LoginComponent {
	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Login form. */
	protected readonly loginForm: FormGroup<LoginForm>;

	/** Common global form errors. */
	protected readonly commonErrors$ = new BehaviorSubject('');

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
			.pipe(
				catchFormErrors(this.loginForm),
				catchError((errors: unknown) => {
					if (errors instanceof AppValidationError) {
						if (errors.validationData.nonFieldErrors != null) {
							this.commonErrors$.next(errors.validationData.nonFieldErrors);
						}
					}
					return throwError(() => errors);
				}),
				stopLoadingStatus(this.isLoading$),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => {
				this.router.navigate(['/']);
			});
	}

	/**
	 * Checks is conrols has required error.
	 * @param controlName Name of control that need to be checked.
	 */
	protected hasRequiredError(controlName: string): boolean {
		if (this.loginForm.contains(controlName)) {
			return this.loginForm.controls[controlName as keyof LoginForm].hasError('required');
		}

		return false;
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
	protected hasServerError(controlName: string): string | boolean {
		if (this.loginForm.contains(controlName)) {
			return this.loginForm.controls[controlName as keyof LoginForm].getError('invalid');
		}

		return false;
	}

	/** Initialize register form. */
	private initLoginForm(): FormGroup<LoginForm> {
		return this.formBuilder.group<LoginForm>({
			email: this.formBuilder.control('', [Validators.required, Validators.email]),
			password: this.formBuilder.control('', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]),
		});
	}
}
