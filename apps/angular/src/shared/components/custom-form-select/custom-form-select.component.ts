import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	Output,
	inject,
	EventEmitter,
	DestroyRef,
} from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { DefaultParams } from '@js-camp/core/models/default-params';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BaseFormControl } from '../base-form-control/base-form-control';

const defaultParams: DefaultParams = {
	name: '',
	pageNumber: 0,
	search: '',
};

/** Custom form select. */
@Component({
	selector: 'camp-custom-form-select',
	templateUrl: './custom-form-select.component.html',
	styleUrls: ['./custom-form-select.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: CustomFormSelectComponent }],
})
export class CustomFormSelectComponent<T extends object> extends BaseFormControl<T[]> implements OnInit {
	/** Readable field. */
	@Input()
	public readableField = 'name';

	/** Form builder. */
	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Separator keys. */
	protected separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Parameters. */
	protected readonly params$ = new BehaviorSubject<DefaultParams>(defaultParams);

	/** @inheritdoc */
	public override innerControl: FormControl = this.formBuilder.control(defaultParams.search);

	/** @inheritdoc */
	public override id = `custom-input-${CustomFormSelectComponent.nextId++}`;

	/** Filtered items. */
	protected filteredItems$ = new BehaviorSubject<readonly T[]>([]);

	/** Trigger to add item. */
	@Output()
	public getAddedItem = new EventEmitter<DefaultParams>();

	/** Added item by user. */
	@Input({ required: true })
	public set addedItem(newValueItem: T | null) {
		if (newValueItem != null) {
			this.value = this.value?.concat(newValueItem) ?? [newValueItem];
			this.innerControl.setValue('');
		}
	}

	/** Trigger to get items. */
	@Output()
	public getItems = new EventEmitter<DefaultParams>();

	/** Items. */
	private _items: T[] = [];

	/** Gets items. */
	@Input({ required: true })
	public get items(): T[] {
		return this._items;
	}

	/** Sets items. */
	public set items(newItems: readonly T[] | null) {
		if (newItems != null && newItems.length > 0) {
			this._items = [...this.items, ...newItems];
		} else if (newItems != null && newItems.length === 0) {
			this._items = [];
		}
		this.filteredItems$.next(this._items);
	}

	private readonly destroyRef = inject(DestroyRef);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.params$
			.pipe(
				debounceTime(DEBOUNCE_TIME),
				distinctUntilChanged(),
				tap(params => {
					this.getItems.emit(params);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();

		this.innerControl.valueChanges
			.pipe(
				debounceTime(DEBOUNCE_TIME),
				distinctUntilChanged(),
				tap(search => {
					this.items = [];
					this.params$.next({
						search,
						pageNumber: defaultParams.pageNumber,
						name: defaultParams.name,
					});
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	/**
	 * On scroll event.
	 * @param params Parametes.
	 */
	protected onScroll(params: DefaultParams): void {
		if (params.pageNumber) {
			this.params$.next({ ...params, pageNumber: params.pageNumber + 1 });
		}
	}

	/**
	 * Adds new item.
	 * @param event Mat chip event.
	 */
	protected add(event: MatChipInputEvent): void {
		const { value } = event;

		if (value == null) {
			return;
		}

		this.getAddedItem.emit({ name: value, pageNumber: defaultParams.pageNumber });
	}

	/**
	 * Removes item.
	 * @param element Item.
	 */
	protected remove(element: T): void {
		const index = this.value?.indexOf(element);

		if (index == null) {
			return;
		}

		if (index >= 0) {
			this.value?.splice(index, 1);
		}

		if (this.value?.length === 0) {
			this.value = null;
		}
	}

	/**
	 * Make element readable.
	 * @param element Element.
	 */
	protected toReadable(element: T): unknown {
		if (this.readableField in element) {
			return element[this.readableField as keyof T];
		}

		return element;
	}

	/**
	 * Tracked by choosen elements. Elements its unique items.
	 * @param _index Index.
	 * @param element Unique element.
	 */
	protected trackByChoosenElement(_index: number, element: T): T {
		return element;
	}

	/**
	 * Tracked by auto complete elements. Elements its unique items.
	 * @param _index Index.
	 * @param element Unique element.
	 */
	protected trackByAutoCompliteElements(_index: number, element: T): T {
		return element;
	}

	/**
	 * Selects item.
	 * @param element Item.
	 */
	protected selected(element: T): void {
		if (!this.value) {
			this.value = [];
		}

		if (!this.value?.includes(element)) {
			this.value = this.value.concat(element);
			this.innerControl.setValue('');
		}
	}
}
