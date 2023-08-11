import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	Input,
	Optional,
	Self,
	ViewChild,
	inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	ControlValueAccessor,
	FormControl,
	NgControl,
	NonNullableFormBuilder,
	ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
	BehaviorSubject,
	Observable,
	Subject,
	combineLatestWith,
	debounceTime,
	distinctUntilChanged,
	first,
	map,
	of,
	switchMap,
	tap,
} from 'rxjs';
import { COMMA, E, ENTER, T } from '@angular/cdk/keycodes';
import { Genre } from '@js-camp/core/models/genre/genre';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../shared.module';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';

@Component({
	selector: 'camp-genres-form-input',
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
	templateUrl: './genres-form-input.component.html',
	styleUrls: ['./genres-form-input.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: GenresFormInputComponent }],
})
export class GenresFormInputComponent implements MatFormFieldControl<Genre[]>, ControlValueAccessor {
	protected separatorKeysCodes: number[] = [ENTER, COMMA];
	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly pageNumber = new BehaviorSubject(0);

	private readonly search = new BehaviorSubject('');

	private readonly items = new BehaviorSubject<Genre[]>([]);

	protected onScroll() {
		this.pageNumber.next(this.pageNumber.value + 1);
	}

	private _value: Genre[] | null = null;
	get value() {
		return this._value;
	}

	stateChanges = new Subject<void>();

	set value(tel: Genre[] | null) {
		this._value = tel;
		this.stateChanges.next();
	}

	ngOnDestroy() {
		this.stateChanges.complete();
	}

	static nextId = 0;

	@HostBinding() id = `genres-input-${GenresFormInputComponent.nextId++}`;

	@Input()
	get placeholder() {
		return this._placeholder;
	}
	set placeholder(plh) {
		this._placeholder = plh;
		this.stateChanges.next();
	}
	private _placeholder!: string;

	@ViewChild('genresInput') genresInput!: ElementRef<HTMLInputElement>;
	protected conrol: FormControl = this.formBuilder.control<string>('');

	@Optional()
	@Self()
	public readonly ngControl = inject(NgControl);

	private genresService = inject(GenresService);
	protected filteredGenres = new BehaviorSubject<readonly Genre[]>([]);

	constructor() {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}

		this.pageNumber
			.pipe(
				combineLatestWith(this.search),
				debounceTime(DEBOUNCE_TIME),
				distinctUntilChanged(),
				switchMap(([pageNumber, search]) => this.genresService.getGenres({ pageNumber, search })),
				map((pagination) => pagination.items)
			)
			.subscribe((pagination) => {
				this.filteredGenres.next([...this.filteredGenres.value, ...pagination]);
			});

		this.conrol.valueChanges
			.pipe(
				tap((search: string) => {
					this.pageNumber.next(0);
					this.search.next(search);
					this.filteredGenres.next([]);
				})
			)
			.subscribe();
	}

	// eslint-disable-next-line no-empty-function
	public onChange(_value: Genre[]): void {}

	/** Touch field.*/
	// eslint-disable-next-line no-empty-function
	public onTouched(): void {}

	/** @inheritdoc */
	public writeValue(value: Genre[]): void {
		this.value = value;
	}

	/** @inheritdoc */
	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	/** @inheritdoc */
	public registerOnTouched(fn: VoidFunction): void {
		this.onTouched = fn;
	}

	/** @inheritdoc */
	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	focused: boolean = false;
	shouldLabelFloat = false;
	disabled = false;
	controlType = 'genres-input';

	get errorState(): boolean {
		return false;
	}

	// ngDoCheck() {
	// 	if (this.ngControl) {
	// 		this.updateErrorState();
	// 	}
	// }

	// private updateErrorState() {
	// 	const parent = this._parentFormGroup || this.parentForm;

	// 	const oldState = this.errorState;
	// 	const newState = (this.ngControl?.invalid || this.parts.invalid) && (this.touched || parent.submitted);

	// 	if (oldState !== newState) {
	// 		this.errorState = newState;
	// 		this.stateChanges.next();
	// 	}
	// }

	onFocusIn() {
		if (!this.focused) {
			this.focused = true;
			this.stateChanges.next();
		}
	}

	onFocusOut() {
		this.focused = false;
		this.onTouched();
		this.stateChanges.next();
	}

	public describedBy = '';

	public setDescribedByIds(ids: string[]): void {
		this.describedBy = ids.join(' ');
	}

	protected readonly _elementRef = inject(ElementRef<HTMLElement>);

	public onContainerClick(event: MouseEvent): void {
		if ((event.target as Element).tagName.toLowerCase() !== 'input') {
			const input = this._elementRef.nativeElement.querySelector('input');
			if (input) {
				input.focus();
			}
		}
	}

	get empty() {
		return this._value == null;
	}
	private _required = false;

	@Input()
	get required() {
		return this._required;
	}
	set required(req: boolean) {
		this._required = coerceBooleanProperty(req);
		this.stateChanges.next();
	}

	add(event: MatChipInputEvent): void {
		const value = event.value;
		if (value == null) {
			return;
		}

		this.genresService
			.getGenres({ name: value })
			.pipe(
				first(),
				switchMap((genres) => {
					if (genres.count !== 0) {
						of(genres.items[0]);
					}

					return this.genresService.createGenre(value);
				})
			)
			.subscribe((genre) => {
				if (this.value?.filter((item) => item.id === genre.id).length !== 0) {
					return;
				}
				this.value?.push(genre);
				event.chipInput?.clear();
				this.conrol.setValue('');
			});

		// Clear the input value
	}

	remove(fruit: Genre): void {
		const index = this.value?.indexOf(fruit);

		if (index == null) {
			return;
		}

		if (index >= 0) {
			this.value!.splice(index, 1);
		}
	}

	selected(fruit: Genre): void {
		if (!this.value) {
			this.value = [];
		}

		// checks if coming value already exists
		if (this.value.filter((item) => item.id === fruit.id).length !== 0) {
			return;
		}

		this.value.push(fruit);
		this.genresInput.nativeElement.value = '';
		this.conrol.setValue('');
	}
}
