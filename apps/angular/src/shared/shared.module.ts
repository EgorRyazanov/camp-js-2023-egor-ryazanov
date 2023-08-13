import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReadableAnimeStatus } from './pipes/readable-anime-status.pipe';
import { ReadableAnimeType } from './pipes/readable-anime-type.pipe';
import { Empty } from './pipes/empty.pipe';
import { ErrorMessage } from './pipes/readable-error-message.pipe';
import { ReadableGenres } from './pipes/readable-genres.pipe';
import { ReadableSeason } from './pipes/readable-seasons.pipe';
import { ReadableStudios } from './pipes/readable-studios.pipe';
import { ReadableRating } from './pipes/readable-ratings.pipe';
import { ReadableSource } from './pipes/readable-source.pipe';
import { YesNo } from './pipes/yes-no.pipe';

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
		YesNo,
	],
	imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule],
	exports: [
		SpinnerComponent,
		HttpClientModule,
		ReadableAnimeStatus,
		ReadableAnimeType,
		Empty,
		ErrorMessage,
		ReadableGenres,
		ReadableSeason,
		ReadableStudios,
		ReadableRating,
		ReadableSource,
		YesNo,
	],
})
export class SharedModule {}
