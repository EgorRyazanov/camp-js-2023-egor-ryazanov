import { Pipe, PipeTransform } from '@angular/core';
import { AppValidators } from '@js-camp/angular/core/utils/app-validators';

/** Error message pipe. */
@Pipe({
	name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
	/**
	 * Converts error type to message.
	 * @param fieldName Name of control with error.
	 * @param errorType Error type.
	 */
	public transform(fieldName: string, errorType: string): string {
		return AppValidators.convertTypeToMessage(errorType, fieldName);
	}
}
