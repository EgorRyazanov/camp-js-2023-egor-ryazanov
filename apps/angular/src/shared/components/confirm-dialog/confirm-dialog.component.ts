import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/** Confirm dialog data. */
interface ConfirmDialogData {

	/** Message. */
	message: string;
}

/** Confirm dialog. */
@Component({
	selector: 'camp-confirm-dialog',
	standalone: true,
	imports: [CommonModule, MatDialogModule, MatButtonModule],
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
	public constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}
