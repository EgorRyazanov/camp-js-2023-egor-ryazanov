import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedGuard } from '@js-camp/angular/core/guards/authorized.guard';

import { BasePageComponent } from '../base-page/base-page.component';

import { AnimesPageComponent } from './animes-page/animes-page.component';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';
import { EditAnimePageComponent } from './manage-anime/edit-anime-page/edit-anime-page.component';
import { CreateAnimePageComponent } from './manage-anime/create-anime-page/create-anime-page.component';

const routes: Routes = [
	{
		path: '',
		title: 'Animes',
		component: BasePageComponent,
		children: [
			{
				path: '',
				component: AnimesPageComponent,
			},
		],
	},
	{
		path: 'create',
		title: 'Create Anime',
		component: BasePageComponent,
		canActivate: [authorizedGuard],
		children: [
			{
				path: '',
				component: CreateAnimePageComponent,
			},
		],
	},
	{
		path: ':id',
		title: 'Anime',
		component: BasePageComponent,
		canActivate: [authorizedGuard],
		children: [
			{
				path: '',
				component: AnimeDetailsPageComponent,
			},
			{
				path: 'edit',
				title: 'Edit anime',
				component: EditAnimePageComponent,
			},
		],
	},
];

/** Anime routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
