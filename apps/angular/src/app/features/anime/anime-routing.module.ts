import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimesPageComponent } from './animes-page/animes-page.component';

const routes: Routes = [
	{
		path: '',
		component: AnimesPageComponent,
	},
];

/** Anime routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
