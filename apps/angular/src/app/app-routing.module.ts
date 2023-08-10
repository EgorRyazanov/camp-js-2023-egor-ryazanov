import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './features/error-page/error-page.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/animes',
		pathMatch: 'full',
	},
	{
		path: 'animes',
		loadChildren: () => import('./features/anime/anime.module').then(module => module.AnimeModule),
	},
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.module').then(module => module.AuthModule),
	},
	{
		path: '**',
		component: ErrorPageComponent,
	},
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
