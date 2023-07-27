import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimesPageComponent } from './features/anime/animes-page/animes-page.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';

const routes: Routes = [
	{
		path: '',
		component: AnimesPageComponent,
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
