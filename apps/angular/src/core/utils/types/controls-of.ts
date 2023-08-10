import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

type NonUndefined<T> = T extends undefined ? never : T;

/** Performs flat parsing of provided type and creates control for each of its fields. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ControlsOf<T extends Record<string, any>> = {
	[K in keyof T]: T[K] extends readonly any[]
		? FormControl<T[K]>
		: T[K] extends Record<string, any>
		? FormGroup<ControlsOf<T[K]>>
		: FormControl<T[K]>;
};
