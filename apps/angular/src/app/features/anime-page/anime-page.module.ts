import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatIconModule,
		MatButtonModule,
		BrowserAnimationsModule,
	],
})
export class AnimePageModule {}
