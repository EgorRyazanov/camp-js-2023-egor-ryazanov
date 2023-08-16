import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Error dialog data. */
interface ErrorDialogData {

	/** Message. */
	message: string;
}

/** Error dialog. */
@Component({
	selector: 'camp-error-dialog',
	templateUrl: './error-dialog.component.html',
	styleUrls: ['./error-dialog.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
	/** Error message. */
	protected readonly errorDialogMessage = inject<ErrorDialogData>(MAT_DIALOG_DATA);
}
