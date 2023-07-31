import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { catchFormErrors } from '@js-camp/angular/core/utils/catch-form-error';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

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

	public constructor() {
		this.registerForm = this.initRegisterForm();
	}

	/** Handle 'submit' of the submit form. */
	protected onSubmit(): void {
		this.isLoading$.next(true);
		this.userService
			.register(this.registerForm.value)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				catchFormErrors(this.registerForm),
				catchError((error) => {
					console.log(error);
					return throwError(() => error);
				})
			)
			.subscribe(() => {
				this.isLoading$.next(false);
				this.router.navigate(['/']);
			});
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
