import { ChangeDetectionStrategy, Component, Input, Optional, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { BehaviorSubject, catchError, first } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../shared.module';
import { BaseFormControl } from '../base-form-control/base-form-control';
import { Dest, ImageBucket } from '@js-camp/core/models/image-bucket';
import { ImageService } from '@js-camp/angular/core/services/image.service';

const defaultImageParams: ImageBucket = {
	dest: Dest.AnimeImages,
	filename: '',
};

@Component({
	selector: 'camp-custom-image-uploader',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatIconModule,
		MatAutocompleteModule,
		MatChipsModule,
		InfiniteScrollModule,
		SharedModule,
	],
	templateUrl: './custom-image-uploader.component.html',
	styleUrls: ['./custom-image-uploader.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: CustomImageUploaderComponent }],
})
export class CustomImageUploaderComponent extends BaseFormControl<string> {
	private _params: ImageBucket = { ...defaultImageParams };

	private imageService = inject(ImageService);

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

	protected uploadFile(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		if (element.files != null) {
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
					})
				)
				.subscribe((url) => {
					this.imageUrl.next(url);
					this.value = url;
				});
		}
	}
}
