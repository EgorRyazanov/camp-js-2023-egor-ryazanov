import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { EmptyPipe } from './pipes/empty.pipe';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { ReadablePipe } from './pipes/readable.pipe';

/** Shared module. */
@NgModule({
	declarations: [SpinnerComponent, EmptyPipe, ErrorMessagePipe, YesNoPipe, ReadablePipe],
	imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule],
	exports: [SpinnerComponent, HttpClientModule, EmptyPipe, ErrorMessagePipe, YesNoPipe, ReadablePipe],
})
export class SharedModule {}
