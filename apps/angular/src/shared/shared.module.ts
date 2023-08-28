import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';

import { CustomFormSelectComponent } from './components/custom-form-select/custom-form-select.component';
import { CustomImageUploaderComponent } from './components/custom-image-uploader/custom-image-uploader.component';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { EmptyPipe } from './pipes/empty.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
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
		MatInputModule,
	],
	exports: [
		SpinnerComponent,
		HttpClientModule,
		EmptyPipe,
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
