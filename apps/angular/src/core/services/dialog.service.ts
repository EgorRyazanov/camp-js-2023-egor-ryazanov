import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '@js-camp/angular/shared/components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent, ErrorDialogData } from '@js-camp/angular/shared/components/error-dialog/error-dialog.component';

/** Dialog service. */
@Injectable({
	providedIn: 'root',
})
export class AppDialogService {
	private readonly dialogService = inject(MatDialog);

	/**
	 * Opens confirmation dialog.
	 * @param message Message.
	 */
	public openConfirmDialog(message: string): MatDialogRef<ConfirmDialogComponent, boolean> {
		return this.dialogService.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
			data: {
				message,
			},
		});
	}

	/**
	 * Opens error dialog.
	 * @param message Message.
	 */
	public openErrorDialog(message: string): MatDialogRef<ErrorDialogComponent, boolean> {
		return this.dialogService.open<ErrorDialogComponent, ErrorDialogData>(ErrorDialogComponent, {
			data: {
				message,
			},
		});
	}
}
