import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReadableAnimeStatus } from './directives/readable-anime-status.pipe';
import { ReadableAnimeType } from './directives/readable-anime-type.pipe';
import { Empty } from './directives/empty.pipe';
import { ErrorMessage } from './directives/readable-error-message.pipe';
import { ReadableGenres } from './directives/readable-genres.pipe';
import { ReadableSeason } from './directives/readable-seasons.pipe';
import { ReadableStudios } from './directives/readable-studios.pipe';
import { ReadableRating } from './directives/readable-ratings.pipe';
import { ReadableSource } from './directives/readable-source.pipe';
import { YesNo } from './directives/yes-no.pipe';

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
