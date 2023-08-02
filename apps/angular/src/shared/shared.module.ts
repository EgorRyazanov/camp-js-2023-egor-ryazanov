import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReadableAnimeStatus } from './directives/anime-status.pipe';
import { ReadableAnimeType } from './directives/anime-type.pipe';
import { ErrorMessage } from './directives/error-message.pipe';

/** Shared module. */
@NgModule({
	declarations: [SpinnerComponent, ReadableAnimeStatus, ReadableAnimeType, ErrorMessage],
	imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule],
	exports: [SpinnerComponent, HttpClientModule, ReadableAnimeStatus, ReadableAnimeType, ErrorMessage],
})
export class SharedModule {}
