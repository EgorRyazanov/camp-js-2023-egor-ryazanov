import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export namespace AppValidators {
	export const MIN_LENGHT = 8;

	/**
	 * Checks whether the current control matches another.
	 * @param controlName Control name to check matching with.
	 */
	export function matchControl(controlName: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (control.get(controlName)?.value !== control.value) {
				return { matchError: true };
			}
			return null;
		};
	}
}
