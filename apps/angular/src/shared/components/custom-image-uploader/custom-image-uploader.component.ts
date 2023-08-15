import { ChangeDetectionStrategy, Component, ElementRef, Input, Optional, ViewChild, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject, catchError, first } from 'rxjs';
import { BaseFormControl } from '../base-form-control/base-form-control';
import { Dest, ImageBucket } from '@js-camp/core/models/image-bucket';
import { ImageService } from '@js-camp/angular/core/services/image.service';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';

const defaultImageParams: ImageBucket = {
	dest: Dest.AnimeImages,
	filename: '',
};

@Component({
	selector: 'camp-custom-image-uploader',
	templateUrl: './custom-image-uploader.component.html',
	styleUrls: ['./custom-image-uploader.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: CustomImageUploaderComponent }],
})
export class CustomImageUploaderComponent extends BaseFormControl<string> {
	protected readonly isLoading$ = new BehaviorSubject(false);

	private _params: ImageBucket = { ...defaultImageParams };

	private imageService = inject(ImageService);

	@ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

	@Input()
	@Optional()
	public set params(params: ImageBucket) {
		this._params = { ...this._params, ...params };
	}

	public get params() {
		return this._params;
	}

	protected readonly imageUrl = new BehaviorSubject<string | null>(null);

	protected readonly uploadError = new BehaviorSubject<null | string>(null);

	@Input()
	public set defaultImage(imageUrl: string | null) {
		this.imageUrl.next(imageUrl);
	}

	private readonly formBuilder = inject(NonNullableFormBuilder);

	public override innerControl: FormControl = this.formBuilder.control<File | null>(null);

	public override id = `custom-image-${CustomImageUploaderComponent.nextId++}`;

	protected triggerInput() {
		if (this.imageInput != null) {
			this.imageInput.nativeElement.click();
		}
	}

	protected uploadFile(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		if (element.files != null) {
			this.isLoading$.next(true)
			const file = element.files[0];
			this.params = { ...this.params, filename: file.name };
			this.imageService
				.create(this.params, file)
				.pipe(
					first(),
					catchError((error) => {
						this.innerControl.setValue(null);
						this.imageUrl.next(null);
						// Puts this error because it comes in xml format.
						this.ngControl.control?.setErrors({ uploadImage: true });
						throw error;
					}),
					stopLoadingStatus(this.isLoading$)
				)
				.subscribe((url) => {
					this.imageUrl.next(url);
					this.value = url;
				});
		}
	}
}
