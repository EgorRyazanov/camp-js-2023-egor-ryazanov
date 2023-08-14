import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { Empty } from './pipes/empty.pipe';
import { ErrorMessage } from './pipes/error-message.pipe';
import { YesNo } from './pipes/yes-no.pipe';
import { Readable } from './pipes/readable.pipe';

/** Shared module. */
@NgModule({
	declarations: [SpinnerComponent, Empty, ErrorMessage, YesNo, Readable],
	imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule],
	exports: [SpinnerComponent, HttpClientModule, Empty, ErrorMessage, YesNo, Readable],
})
export class SharedModule {}
