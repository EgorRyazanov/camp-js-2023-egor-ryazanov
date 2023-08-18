import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@js-camp/angular/shared/components/error-dialog/error-dialog.component';

/** Confirm dialog service. */
@Injectable({
	providedIn: 'root',
})
export class ErrorDialogService {
	private readonly dialogService = inject(MatDialog);

	/**
	 * Opens confirmation dialog.
	 * @param message Message.
	 */
	public openDialog(message: string): MatDialogRef<ErrorDialogComponent, boolean> {
		return this.dialogService.open(ErrorDialogComponent, {
			data: {
				message,
			},
		});
	}
}
