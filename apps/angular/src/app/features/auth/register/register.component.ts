import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { AppValidators } from '@js-camp/angular/core/utils/app-validators';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { AppError } from '@js-camp/core/models/app-error';
import { BehaviorSubject, catchError, finalize, first, throwError } from 'rxjs';

/** Register page. */
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

	private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly router = inject(Router);

	protected readonly commonErrors$ = new BehaviorSubject<AppError[]>([]);

	public constructor() {
		this.registerForm = this.initRegisterForm();
	}

	/** Handle 'submit' of the submit form. */
	protected onSubmit(): void {
		this.registerForm.markAllAsTouched();
		if (this.registerForm.invalid != true) {
			this.isLoading$.next(true);
			this.userService
				.register(this.registerForm.value)
				.pipe(
					first(),
					catchFormErrors(this.registerForm),
					catchError((errors) => {
						if (errors instanceof Array) {
							this.commonErrors$.next(errors);
						}
						return throwError(() => errors);
					}),
					finalize(() => {
						this.isLoading$.next(false);
					}),
					takeUntilDestroyed(this.destroyRef),
				)
				.subscribe(() => {
					this.router.navigate(['/']);
				});
		}
	}

	private initRegisterForm(): FormGroup {
		return this.fb.group({
			email: this.fb.control('', [Validators.required, Validators.email]),
			firstName: this.fb.control('', [Validators.required]),
			lastName: this.fb.control('', [Validators.required]),
			password: this.fb.control('', [Validators.required, Validators.minLength(AppValidators.MIN_LENGHT)]),
			repeatPassword: this.fb.control('', [Validators.required, Validators.minLength(AppValidators.MIN_LENGHT), AppValidators.matchControl("password")]),
		});
	}
}
