import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { AppValidators } from '@js-camp/angular/core/utils/app-validators';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { ControlsOf } from '@js-camp/angular/core/utils/types/controls-of';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { Register } from '@js-camp/core/models/auth/register';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { MIN_PASSWORD_LENGTH } from '../utils/constants';

type RegisterForm = ControlsOf<Register & { repeatPassword: string; }>;

/** Register page. */
@Component({
	selector: 'camp-login',
	templateUrl: './register.component.html',
	styleUrls: ['../auth.css'],
})
export class RegisterComponent {
	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Register form. */
	protected readonly registrationForm: FormGroup<RegisterForm>;

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
		this.registrationForm = this.initRegisterForm();
	}

	/** Registers user. */
	protected onSubmit(): void {
		this.registrationForm.markAllAsTouched();
		if (this.registrationForm.invalid) {
			return;
		}

		this.isLoading$.next(true);
		this.userService
			.register(this.registrationForm.getRawValue())
			.pipe(
				catchFormErrors(this.registrationForm),
				catchError((errors: unknown) => {
					if (errors instanceof AppValidationError) {
						if (errors.validationData.nonFieldErrors != null) {
							this.commonErrors$.next(errors.validationData.nonFieldErrors);
						}
					}
					return throwError(() => errors);
				}),
				tap(() => {
					this.isLoading$.next(false);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => {
				this.router.navigate(['/']);
			});
	}

	/** Initialize register form. */
	private initRegisterForm(): FormGroup<RegisterForm> {
		return this.formBuilder.group<RegisterForm>({
			email: this.formBuilder.control('', [Validators.required, Validators.email]),
			firstName: this.formBuilder.control('', [Validators.required]),
			lastName: this.formBuilder.control('', [Validators.required]),
			password: this.formBuilder.control('', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]),
			repeatPassword: this.formBuilder.control('', [
				Validators.required,
				Validators.minLength(MIN_PASSWORD_LENGTH),
				AppValidators.matchControl('password'),
			]),
		});
	}
}
