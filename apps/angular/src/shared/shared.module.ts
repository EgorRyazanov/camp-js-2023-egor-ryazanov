import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { EmptyPipe } from './pipes/empty.pipe';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

/** Shared module. */
@NgModule({
	declarations: [SpinnerComponent, EmptyPipe, ErrorMessagePipe, YesNoPipe, VideoPlayerComponent, ErrorDialogComponent],
	imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule, MatDialogModule, MatButtonModule],
	exports: [
		SpinnerComponent,
		HttpClientModule,
		EmptyPipe,
		ErrorMessagePipe,
		YesNoPipe,
		VideoPlayerComponent,
		ErrorDialogComponent,
	],
})
export class SharedModule {}
