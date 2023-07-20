import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AnimePageComponent } from './anime-page.component';

/** Anime Module. */
@NgModule({
	declarations: [AnimePageComponent],
	imports: [
		CommonModule,
		SharedModule,
		MatTableModule,
		NgIf,
		MatProgressSpinnerModule,
		MatSortModule,
		MatPaginatorModule,
	],
})
export class AnimePageModule {}
