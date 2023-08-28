import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
import { Dest, ImageBucket } from '@js-camp/core/models/image-bucket';

import { BaseFormControl } from '../base-form-control/base-form-control';

/** Image params. */
const defaultImageParams: ImageBucket = {
	dest: Dest.AnimeImages,
	filename: '',
};

/** Custom image uploader. */
@Component({
	selector: 'camp-custom-image-uploader',
	templateUrl: './custom-image-uploader.component.html',
	styleUrls: ['./custom-image-uploader.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: CustomImageUploaderComponent }],
})
export class CustomImageUploaderComponent extends BaseFormControl<File> {
	/** Loading status. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Params. */
	private _params: ImageBucket = { ...defaultImageParams };

	/** Image ref. */
	@ViewChild('imageInput') protected imageInput!: ElementRef<HTMLInputElement>;

	/** Sets params. */
	@Input()
	public set params(params: ImageBucket) {
		this._params = { ...this._params, ...params };
	}

	/** Gets params. */
	public get params(): ImageBucket {
		return this._params;
	}

	/** Image URL. */
	protected readonly imageUrl$ = new BehaviorSubject<string | null>(null);

	/** Sets default image. */
	@Input()
	public set defaultImage(imageUrl: string | null) {
		this.imageUrl$.next(imageUrl);
	}

	/** Form builder. */
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** @inheritdoc */
	public override innerControl: FormControl = this.formBuilder.control<File | null>(null);

	/** @inheritdoc */
	public override id = `custom-image-${CustomImageUploaderComponent.nextId++}`;

	/** Triggers input. */
	protected triggerInput(): void {
		if (this.imageInput != null) {
			this.imageInput.nativeElement.click();
		}
	}

	/** @inheritdoc */
	public override onContainerClick(event: MouseEvent): void {
		if ((event.target as Element).tagName.toLowerCase() !== 'input') {
			this.imageInput?.nativeElement?.click();
		}
	}

	/**
	 * Uploads file.
	 * @param event Event.
	 */
	protected uploadFile(event: Event): void {
		const element = event.currentTarget as HTMLInputElement;
		if (element.files != null) {
			this.value = element.files[0];
			this.imageUrl$.next(element.files[0].name);
		}
	}
}
