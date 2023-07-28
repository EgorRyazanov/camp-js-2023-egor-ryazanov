import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { unAuthorizedGuard } from '@js-camp/angular/core/guards/unauthorized.guard';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [unAuthorizedGuard],
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [unAuthorizedGuard],
	},
];

/** Anime routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
