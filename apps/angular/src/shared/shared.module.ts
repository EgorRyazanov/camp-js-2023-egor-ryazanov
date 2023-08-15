import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReadableAnimeStatus } from './directives/anime-status.pipe';
import { ReadableAnimeType } from './directives/anime-type.pipe';
import { Empty } from './directives/empty.pipe';
import { ErrorMessage } from './directives/error-message.pipe';
import { ReadableGenres } from './directives/genres.pipe';
import { ReadableSeason } from './directives/seasons.pipe';
import { ReadableStudios } from './directives/studios.pipe';
import { ReadableRating } from './directives/ratings.pipe';
import { ReadableSource } from './directives/source.pipe';
import { ReadableObject } from './directives/readable-object.pipe';
import { CustomImageUploaderComponent } from './components/custom-image-uploader/custom-image-uploader.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CustomFormSelectComponent } from './components/custom-form-select/custom-form-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';

/** Shared module. */
@NgModule({
	declarations: [
		SpinnerComponent,
		ReadableAnimeStatus,
		ReadableAnimeType,
		Empty,
		ErrorMessage,
		ReadableGenres,
		ReadableSeason,
		ReadableStudios,
		ReadableRating,
		ReadableSource,
		ReadableObject,
		CustomImageUploaderComponent,
		CustomFormSelectComponent,
		ConfirmDialogComponent,
	],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
		HttpClientModule,
		MatAutocompleteModule,
		MatChipsModule,
		InfiniteScrollModule,
		ReactiveFormsModule,
		MatIconModule,
		MatFormFieldModule,
		MatDialogModule,
		MatButtonModule,
	],
	exports: [
		SpinnerComponent,
		HttpClientModule,
		ReadableAnimeStatus,
		ReadableAnimeType,
		Empty,
		ReadableObject,
		ErrorMessage,
		ReadableGenres,
		ReadableSeason,
		ReadableStudios,
		ReadableRating,
		ReadableSource,
		CustomImageUploaderComponent,
		CustomFormSelectComponent,
		ConfirmDialogComponent,
	],
})
export class SharedModule {}
