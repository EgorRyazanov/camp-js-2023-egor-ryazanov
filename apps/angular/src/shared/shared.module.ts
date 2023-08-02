import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorMessage } from './directives/error-message.pipe';

/** Shared module. */
@NgModule({
	declarations: [SpinnerComponent, ErrorMessage],
	imports: [CommonModule, MatProgressSpinnerModule, HttpClientModule],
	exports: [SpinnerComponent, HttpClientModule, ErrorMessage],
})
export class SharedModule {}
