import { FormControl, FormGroup } from '@angular/forms';

// Disabling any eslint rule because controls may be anything
/** Performs flat parsing of provided type and creates control for each of its fields. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ControlsOf<T extends Record<string, any>> = {
	[K in keyof T]: T[K] extends readonly any[] // eslint-disable-line @typescript-eslint/no-explicit-any
		? FormControl<T[K]>
		: T[K] extends Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
			? FormGroup<ControlsOf<T[K]>>
			: FormControl<T[K]>;
};
