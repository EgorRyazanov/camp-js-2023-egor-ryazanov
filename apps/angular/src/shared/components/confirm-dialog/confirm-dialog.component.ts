import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Confirm dialog data. */
export interface ConfirmDialogData {

	/** Message. */
	readonly message: string;
}

/** Confirm dialog. */
@Component({
	selector: 'camp-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
	/** Confirm dialog data. */
	protected readonly confirmDialogData = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
