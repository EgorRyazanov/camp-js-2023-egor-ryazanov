import { Directive, DoCheck, ElementRef, HostBinding, Input, OnDestroy, Optional, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseFormControl<T> implements MatFormFieldControl<T[]>, ControlValueAccessor, OnDestroy, DoCheck {
	@Optional()
	private readonly formGroup = inject(FormGroupDirective);

	private _value: T[] | null = null;

	public stateChanges = new Subject<void>();

	// eslint-disable-next-line no-empty-function
	public onChange = (_value: T[] | null) => {};

	/** Touch field.*/
	public onTouched!: () => void;

	public focused: boolean = false;

	public shouldLabelFloat = false;

	public disabled = false;

	public controlType = 'base-input';

	/** @inheritdoc */
	public writeValue(value: T[]): void {
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

	get value() {
		return this._value;
	}

	set value(newValue: T[] | null) {
		this._value = newValue;
		this.onChange(newValue);
		this.stateChanges.next();
	}

	ngOnDestroy() {
		this.stateChanges.complete();
	}

	static nextId = 0;

	@HostBinding() abstract id: string;

	@Input()
	get placeholder() {
		return this._placeholder;
	}

	set placeholder(plh) {
		this._placeholder = plh;
		this.stateChanges.next();
	}

	private _placeholder!: string;

	abstract innerControl: FormControl;

	public readonly ngControl = inject(NgControl, {
		self: true,
	});

	constructor() {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	/** @inheritdoc */
	public get errorState(): boolean {
		return this._errorState;
	}

	private set errorState(value: boolean) {
		this._errorState = value;
	}

	private _errorState = false;

	ngDoCheck() {
		if (this.ngControl) {
			this.updateErrorState();
		}
	}

	private updateErrorState() {
		const oldState = this.errorState;
		const newState = this.ngControl.control?.errors && (this.formGroup.submitted || this.innerControl.touched);
		if (oldState !== newState) {
			this.errorState = newState ?? false;
			this.stateChanges.next();
		}
	}

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
		this._required = req;
		this.stateChanges.next();
	}
}
