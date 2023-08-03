import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

interface ImageDialogData {
	imageUrl: string;
}

@Component({
	selector: 'camp-image-dialog',
	templateUrl: './image-dialog.component.html',
	styleUrls: ['./image-dialog.component.css'],
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
})
export class ImageDialog {
	constructor(public dialogRef: MatDialogRef<ImageDialog>, @Inject(MAT_DIALOG_DATA) public data: ImageDialogData) {}

	public onNoClick(): void {
		this.dialogRef.close();
	}
}
