import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Image dialog data. */
interface ImageDialogData {

	/** Image URL. */
	readonly imageUrl: string;

	/** English title. */
	readonly titleEnglish: string;
}

/** Image dialog. */
@Component({
	selector: 'camp-image-dialog',
	templateUrl: './image-dialog.component.html',
	styleUrls: ['./image-dialog.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDialogComponent {
	/** Image dialog data. */
	protected readonly imageDialogData = inject<ImageDialogData>(MAT_DIALOG_DATA);
}
