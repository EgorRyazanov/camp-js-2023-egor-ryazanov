import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { AppValidators } from '@js-camp/angular/core/utils/app-validators';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { ErrorMapper } from '@js-camp/core/mappers/error.mapper';
import { AppError, ValidationError } from '@js-camp/core/models/app-error';
import { BehaviorSubject, catchError, finalize, first, throwError } from 'rxjs';

/** Register page. */
@Component({
	selector: 'camp-login',
	templateUrl: './register.component.html',
	styleUrls: ['../auth.css'],
})
export class RegisterComponent {
	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Register form. */
	protected readonly registerForm: FormGroup;

	/** Common global form errors. */
	protected readonly commonErrors$ = new BehaviorSubject<ValidationError[]>([]);

	/** Form builder. */
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** User service. */
	private readonly userService = inject(UserService);

	/** Destroy ref. */
	private readonly destroyRef = inject(DestroyRef);

	/** Router. */
	private readonly router = inject(Router);

	public constructor() {
		this.registerForm = this.initRegisterForm();
	}

	/** Registers user. */
	protected register(): void {
		this.registerForm.markAllAsTouched();
		if (this.registerForm.invalid !== true) {
			this.isLoading$.next(true);
			this.userService
				.register(this.registerForm.value)
				.pipe(
					first(),
					catchFormErrors(this.registerForm),
					catchError((errors: unknown) => {
						if (errors instanceof AppError) {
							if (errors.validationErrors.hasOwnProperty(ErrorMapper.COMMON_ERROR_FIELD)) {
								this.commonErrors$.next(errors.validationErrors[ErrorMapper.COMMON_ERROR_FIELD]);
							}
						}
						return throwError(() => errors);
					}),
					finalize(() => {
						this.isLoading$.next(false);
					}),
					takeUntilDestroyed(this.destroyRef)
				)
				.subscribe(() => {
					this.router.navigate(['/']);
				});
		}
	}

	protected trackByErrors(_: number, error: ValidationError) {
		return error.message;
	}

	/** Initialize register form. */
	private initRegisterForm(): FormGroup {
		return this.formBuilder.group({
			email: this.formBuilder.control('', [Validators.required, Validators.email]),
			firstName: this.formBuilder.control('', [Validators.required]),
			lastName: this.formBuilder.control('', [Validators.required]),
			password: this.formBuilder.control('', [Validators.required, Validators.minLength(AppValidators.MIN_LENGHT)]),
			repeatPassword: this.formBuilder.control('', [
				Validators.required,
				Validators.minLength(AppValidators.MIN_LENGHT),
				AppValidators.matchControl('password'),
			]),
		});
	}
}
