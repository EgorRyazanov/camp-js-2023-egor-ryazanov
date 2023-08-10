import { FormControl } from '@angular/forms';

/** Performs flat parsing of provided type and creates control for each of its fields. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ControlsOf<T extends Record<string, any>> = {
	[K in keyof T]: FormControl<T[K]>;
};
