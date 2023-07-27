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
import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';

/** Auth Module. */
@NgModule({
	declarations: [LoginComponent, RegisterComponent],
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
		AuthRoutingModule,
	],
})
export class AuthModule {}
