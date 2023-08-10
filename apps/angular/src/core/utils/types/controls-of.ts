// eslint-disable @typescript-eslint/no-explicit-any
import { FormControl, FormGroup } from '@angular/forms';
/** Performs flat parsing of provided type and creates control for each of its fields. */
export type ControlsOf<T extends Record<string, any>> = {
	[K in keyof T]: T[K] extends readonly any[]
		? FormControl<T[K]>
		: T[K] extends Record<string, any>
		? FormGroup<ControlsOf<T[K]>>
		: FormControl<T[K]>;
};
