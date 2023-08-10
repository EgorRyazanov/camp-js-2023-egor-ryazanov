import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { AppValidators } from '@js-camp/angular/core/utils/app-validators';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { ControlsOf } from '@js-camp/angular/core/utils/types/controls-of';
import { Registration } from '@js-camp/core/models/auth/registration';
import { BehaviorSubject } from 'rxjs';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';

import { MIN_PASSWORD_LENGTH } from '../utils/constants';

type RegistrationForm = ControlsOf<Registration & { repeatPassword: string; }>;

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
	protected readonly registrationForm: FormGroup<RegistrationForm>;

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
	protected hasRequiredError(controlName: keyof RegistrationForm): boolean {
		return this.registrationForm.controls[controlName].hasError('required');
	}

	/**
	 * Checks is conrols has min length error.
	 * @param controlName Name of control that need to be checked.
	 */
	protected hasMinLengthError(controlName: keyof RegistrationForm): boolean {
		return this.registrationForm.controls[controlName].hasError('minlength');
	}

	/** Checks validity of email . */
	protected get isEmailValid(): boolean {
		return this.registrationForm.controls.email.hasError('email');
	}

	/** Checks passwords are match. */
	protected get hasPasswordMatch(): boolean {
		return this.registrationForm.controls.repeatPassword.hasError('matchError');
	}

	/**
	 * Checks is conrols has server error.
	 * @param controlName Name of control that need to be checked.
	 */
	protected getGeneralFieldErrors(controlName: keyof RegistrationForm): string | null {
		if (this.registrationForm.controls[controlName].hasError('invalid')) {
			return this.registrationForm.controls[controlName].getError('invalid');
		}

		return null;
	}

	/** Initialize register form. */
	private initRegisterForm(): FormGroup<RegistrationForm> {
		return this.formBuilder.group<RegistrationForm>({
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
