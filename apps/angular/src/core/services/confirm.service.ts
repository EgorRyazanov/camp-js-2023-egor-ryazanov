import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@js-camp/angular/shared/components/confirm-dialog/confirm-dialog.component';

/** Confirm dialog service. */
@Injectable({
	providedIn: 'root',
})
export class ConfirmService {
	public constructor(private readonly confirmDialog: MatDialog) {}

	/**
	 * Opens confirmation dialog.
	 * @param message Message.
	 */
	public openDialog(message: string): MatDialogRef<ConfirmDialogComponent, boolean> {
		return this.confirmDialog.open(ConfirmDialogComponent, {
			data: {
				message,
			},
		});
	}
}
