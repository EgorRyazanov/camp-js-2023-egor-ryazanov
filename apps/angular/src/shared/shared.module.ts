import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** Shared module. */
@NgModule({
	declarations: [SpinnerComponent],
	imports: [CommonModule, MatProgressSpinnerModule],
	exports: [SpinnerComponent],
})
export class SharedModule {}
