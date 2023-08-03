/** Error DTO. */
export interface ValidationErrorDto {
	readonly attr: string;
	readonly code: string;
	readonly detail: string;
}
