import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EmptyPipe } from './pipes/empty.pipe';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { ReadableObject } from './pipes/readable-object.pipe';
import { CustomImageUploaderComponent } from './components/custom-image-uploader/custom-image-uploader.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CustomFormSelectComponent } from './components/custom-form-select/custom-form-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

/** Shared module. */
@NgModule({
	declarations: [
		SpinnerComponent,
		EmptyPipe,
		ErrorMessagePipe,
		CustomImageUploaderComponent,
		CustomFormSelectComponent,
		ConfirmDialogComponent,
		ReadableObject,
		VideoPlayerComponent,
		YesNoPipe,
		ErrorDialogComponent,
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
		EmptyPipe,
		ReadableObject,
		ErrorMessagePipe,
		CustomImageUploaderComponent,
		CustomFormSelectComponent,
		ConfirmDialogComponent,
		VideoPlayerComponent,
		YesNoPipe,
		ErrorDialogComponent,
	],
})
export class SharedModule {}
