import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@js-camp/angular/shared/components/error-dialog/error-dialog.component';

/** Confirm dialog service. */
@Injectable({
	providedIn: 'root',
})
export class ErrorDialogService {
	private readonly errorDialog = inject(MatDialog);

	/**
	 * Opens confirmation dialog.
	 * @param message Message.
	 */
	public openDialog(message: string): MatDialogRef<ErrorDialogComponent, boolean> {
		return this.errorDialog.open(ErrorDialogComponent, {
			data: {
				message,
			},
		});
	}
}
