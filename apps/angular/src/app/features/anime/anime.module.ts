import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AnimeComponent } from './anime.component';

/** Anime Module. */
@NgModule({
	declarations: [AnimeComponent],
	imports: [
		HttpClientModule,
		CommonModule,
		SharedModule,
		MatTableModule,
		NgIf,
		MatProgressSpinnerModule,
		MatSortModule,
		MatPaginatorModule,
	],
})
export class AnimeModule {}
