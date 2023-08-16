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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AnimesPageComponent } from './animes-page/animes-page.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AnimeFormComponent } from './manage-anime/anime-form/anime-form.component';
import { EditAnimePageComponent } from './manage-anime/edit-anime-page/edit-anime-page.component';
import { CreateAnimePageComponent } from './manage-anime/create-anime-page/create-anime-page.component';
import { ImageDialogComponent } from './anime-details-page/components/dialog/image-dialog.component';

/** Anime Module. */
@NgModule({
	declarations: [
		AnimesPageComponent,
		AnimeDetailsPageComponent,
		AnimeFormComponent,
		EditAnimePageComponent,
		CreateAnimePageComponent,
		ImageDialogComponent,
	],
	imports: [
		AnimeRoutingModule,
		CommonModule,
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
		MatNativeDateModule,
		MatDatepickerModule,
		MatCheckboxModule,
		SharedModule,
	],
})
export class AnimeModule {}
