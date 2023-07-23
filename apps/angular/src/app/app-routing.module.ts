import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimePageComponent } from './features/anime-page/anime-page.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';

const routes: Routes = [
	{
		path: '',
		component: AnimePageComponent,
	},
	{
		path: 'error',
		component: ErrorPageComponent,
	},
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
