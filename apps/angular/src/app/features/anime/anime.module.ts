import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AnimesPageComponent } from './animes-page/animes-page.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';
import { ImageDialogComponent } from './anime-details-page/components/dialog/image-dialog.component';

/** Anime Module. */
@NgModule({
	declarations: [AnimesPageComponent, AnimeDetailsPageComponent, ImageDialogComponent],
	imports: [
		AnimeRoutingModule,
		CommonModule,
		SharedModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatSortModule,
		MatPaginatorModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
		SharedModule,
	],
})
export class AnimeModule {}
