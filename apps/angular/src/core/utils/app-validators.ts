import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace AppValidators {
	export const MIN_LENGHT = 8;

	/**
	 * Checks whether the current control matches another.
	 * @param controlName Control name to check matching with.
	 */
	export function matchControl(controlName: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (control.parent?.get(controlName)?.value !== control.value) {
				return { matchError: true };
			}
			return null;
		};
	}

	/**
	 * Converts error type to message.
	 * @param errorType Error type.
	 * @param fieldName Field name.
	 */
	export function convertTypeToMessage(errorType: string, fieldName?: string): string {
		const ERROR_TYPE_TO_MESSAGE: Record<string, string> = {
			required: `${fieldName ?? 'Field'} is required`,
			email: 'Email is incorrect',
			minlength: `${fieldName} should contain minimum ${MIN_LENGHT} symbols`,
			matchError: `${fieldName} do not match`,
		};
		return ERROR_TYPE_TO_MESSAGE[errorType];
	}
}
