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
	],
})
export class SharedModule {}
