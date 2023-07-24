import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AnimesPageComponent } from './animes-page/animes-page.component';

/** Anime Module. */
@NgModule({
	declarations: [AnimesPageComponent],
	imports: [CommonModule, SharedModule, MatTableModule, MatProgressSpinnerModule, MatSortModule, MatPaginatorModule],
})
export class AnimeModule {}
