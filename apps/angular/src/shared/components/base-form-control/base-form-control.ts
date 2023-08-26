import { Directive, DoCheck, ElementRef, HostBinding, Input, OnDestroy, SkipSelf, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

/** Base form control. */
@Directive()
export abstract class BaseFormControl<T> implements MatFormFieldControl<T>, ControlValueAccessor, OnDestroy, DoCheck {
	/** @inheritdoc */
	protected readonly formGroup = inject(FormGroupDirective, { optional: true });

	/** Value. */
	private _value: T | null = null;

	// Disabling eslint rules because it was written like that in mat Form field.
	/** @inheritdoc */
	// eslint-disable-next-line rxjs/finnish
	public readonly stateChanges = new Subject<void>(); // eslint-disable-line rxjs/no-exposed-subjects

	/** @inheritdoc */
	public onChange!: (_value: T | null) => void;

	/** Touch field.*/
	public onTouched!: () => void;

	/** @inheritdoc */
	public focused = false;

	/** @inheritdoc */
	public shouldLabelFloat = false;

	/** @inheritdoc */
	public disabled = false;

	/** @inheritdoc */
	public controlType = 'base-input';

	/** @inheritdoc */
	public writeValue(value: T): void {
		this.value = value;
	}

	/** @inheritdoc */
	public registerOnChange(fn: (data: T | null) => void): void {
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

	/** @inheritdoc */
	public get value(): T | null {
		return this._value;
	}

	/** @inheritdoc */
	public set value(newValue: T | null) {
		this._value = newValue;
		this.stateChanges.next();
		if (this.onChange != null) {
			this.onChange(newValue);
		}
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.stateChanges.complete();
	}

	/** @inheritdoc */
	public static nextId = 0;

	/** @inheritdoc */
	@HostBinding() public abstract id: string;

	/** @inheritdoc */
	@Input()
	public get placeholder(): string {
		return this._placeholder;
	}

	/** @inheritdoc */
	public set placeholder(placeholder: string) {
		this._placeholder = placeholder;
		this.stateChanges.next();
	}

	/** Placeholder. */
	private _placeholder = '';

	/** Inner control. */
	protected abstract innerControl: FormControl;

	/** @inheritdoc */
	public readonly ngControl = inject(NgControl);

	public constructor() {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	/** @inheritdoc */
	public get errorState(): boolean {
		return this._errorState;
	}

	/** @inheritdoc */
	private set errorState(value: boolean) {
		this._errorState = value;
	}

	/** Error state. */
	private _errorState = false;

	/** @inheritdoc */
	public ngDoCheck(): void {
		this.updateErrorState();
	}

	/** Updates error state. */
	private updateErrorState(): void {
		const oldState = this.errorState;
		const newState = this.ngControl.invalid && this.innerControl.touched;
		if (oldState !== newState) {
			this.errorState = newState ?? false;
			this.stateChanges.next();
		}
	}

	/** @inheritdoc */
	public onFocusIn(): void {
		if (!this.focused) {
			this.focused = true;
			this.stateChanges.next();
		}
	}

	/** @inheritdoc */
	public onFocusOut(): void {
		this.focused = false;
		this.onTouched();
		this.stateChanges.next();
	}

	/** @inheritdoc */
	public describedBy = '';

	/** @inheritdoc */
	public setDescribedByIds(ids: string[]): void {
		this.describedBy = ids.join(' ');
	}

	/** @inheritdoc */
	protected readonly _elementRef = inject(ElementRef<HTMLElement>);

	/** @inheritdoc */
	public abstract onContainerClick(event: MouseEvent): void;

	/** @inheritdoc */
	public get empty(): boolean {
		return this._value == null;
	}

	/** Required field. */
	private _required = false;

	/** @inheritdoc */
	@Input()
	public get required(): boolean {
		return this._required;
	}

	/** @inheritdoc */
	public set required(req: boolean) {
		this._required = req;
		this.stateChanges.next();
	}
}
