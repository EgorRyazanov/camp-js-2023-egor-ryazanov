import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimesPageComponent } from './features/anime/animes-page/animes-page.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [
	{
		path: '',
		component: AnimesPageComponent,
	},
	{
		path: 'error',
		component: ErrorPageComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
