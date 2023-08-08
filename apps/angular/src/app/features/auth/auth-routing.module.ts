import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { unauthorizedGuard } from '@js-camp/angular/core/guards/unauthorized.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [unauthorizedGuard],
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [unauthorizedGuard],
	},
];

/** Auth routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
