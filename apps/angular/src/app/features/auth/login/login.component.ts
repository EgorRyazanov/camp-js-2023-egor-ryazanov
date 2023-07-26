import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/** Login page. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css', '../auth.css'],
	standalone: true,
	imports: [
		ReactiveFormsModule,
		RouterLink,
		CommonModule,
		SharedModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatSortModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class LoginComponent {
	/** Is app loading. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Login form. */
	protected readonly loginForm: FormGroup;

	private readonly fb = inject(NonNullableFormBuilder);

	// private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		this.loginForm = this.initLoginForm();
	}

	/**
	 * Handle 'submit' of the login form.
	 */
	protected onSubmit(): void {
		// this.userService.login(loginData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}

	private initLoginForm(): FormGroup {
		return this.fb.group({
			email: this.fb.control('', [Validators.required, Validators.email]),
			password: this.fb.control('', Validators.required),
		});
	}
}
