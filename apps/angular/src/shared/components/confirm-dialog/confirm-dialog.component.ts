import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Confirm dialog data. */
interface ConfirmDialogData {

	/** Message. */
	message: string;
}

/** Confirm dialog. */
@Component({
	selector: 'camp-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
	/** Confirm dialog data. */
	protected readonly confirmDialogData = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
