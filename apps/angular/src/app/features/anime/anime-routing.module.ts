import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimesPageComponent } from './animes-page/animes-page.component';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';
import { authorizedGuard } from '@js-camp/angular/core/guards/authorized.guard';

const routes: Routes = [
	{
		path: '',
		component: AnimesPageComponent,
	},
	{
		path: ':id',
		component: AnimeDetailsPageComponent,
		canActivate: [authorizedGuard],
	},
];

/** Anime routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
