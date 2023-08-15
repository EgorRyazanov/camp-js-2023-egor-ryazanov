import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MIN_PASSWORD_LENGTH } from '@js-camp/angular/app/features/auth/utils/constants';

export namespace AppValidators {
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
			minlength: `${fieldName} should contain minimum ${MIN_PASSWORD_LENGTH} symbols`,
			matchError: `${fieldName} do not match`,
			uploadImage: `Upload was failed.`,
		};
		return ERROR_TYPE_TO_MESSAGE[errorType];
	}
}
