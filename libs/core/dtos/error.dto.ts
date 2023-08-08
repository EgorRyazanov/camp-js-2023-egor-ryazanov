/** Error DTO. */
export interface ValidationErrorDto {

	/** Attribute. Example: email, password. */
	readonly attr: string;

	/** Code. Example: permission_denied, method_not_allowed. */
	readonly code: string;

	/** Detail. Example: you do not have permission to perform this action. */
	readonly detail: string;
}
