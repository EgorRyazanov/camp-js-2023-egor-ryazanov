import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { EmptyPipe } from './pipes/empty.pipe';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { ReadableAnimeStatusPipe } from './pipes/anime-status.pipe';
import { ReadableAnimeTypePipe } from './pipes/anime-type.pipe';
import { ReadableGenresPipe } from './pipes/genres.pipe';
import { ReadableStudiosPipe } from './pipes/studios.pipe';
import { ReadableSourcePipe } from './pipes/source.pipe';
import { ReadableRatingPipe } from './pipes/ratings.pipe';
import { ReadableSeasonPipe } from './pipes/seasons.pipe';

/** Shared module. */
@NgModule({
	declarations: [
		SpinnerComponent,
		EmptyPipe,
		ErrorMessagePipe,
		YesNoPipe,
		ReadableAnimeStatusPipe,
		ReadableAnimeTypePipe,
		ReadableGenresPipe,
		ReadableStudiosPipe,
		ReadableSourcePipe,
		ReadableRatingPipe,
		ReadableSeasonPipe,
	],
	imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule],
	exports: [
		SpinnerComponent,
		HttpClientModule,
		EmptyPipe,
		ErrorMessagePipe,
		YesNoPipe,
		ReadableAnimeStatusPipe,
		ReadableAnimeTypePipe,
		ReadableGenresPipe,
		ReadableStudiosPipe,
		ReadableSourcePipe,
		ReadableRatingPipe,
		ReadableSeasonPipe,
	],
})
export class SharedModule {}
