import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { AppValidators } from '@js-camp/angular/core/utils/app-validators';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { AppError } from '@js-camp/core/models/app-error';
import { BehaviorSubject, catchError, finalize, first, throwError } from 'rxjs';

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

	protected readonly commonErrors$ = new BehaviorSubject<AppError[]>([]);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly router = inject(Router);

	public constructor() {
		this.loginForm = this.initLoginForm();
	}

	/** Handle 'submit' of the login form. */
	protected onSubmit(): void {
		this.loginForm.markAllAsTouched();
		if (this.loginForm.invalid != true) {
			this.isLoading$.next(true);
			this.userService
				.login(this.loginForm.value)
				.pipe(
					first(),
					catchFormErrors(this.loginForm),
					catchError((errors) => {
						if (errors instanceof Array) {
							this.commonErrors$.next(errors);
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

	private initLoginForm(): FormGroup {
		return this.formBuilder.group({
			email: this.formBuilder.control('', [Validators.required, Validators.email]),
			password: this.formBuilder.control('', [Validators.required, Validators.minLength(AppValidators.MIN_LENGHT)]),
		});
	}
}
