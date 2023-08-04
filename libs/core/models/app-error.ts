/** App error. */
export class AppError<T extends Record<string, ValidationError[]> = Record<string, ValidationError[]>> extends Error {
	/** Message. */
	public override readonly message: string;

	/** Validation errors. */
	public validationErrors: T;

	public constructor(message: string, validationErrors: T) {
		super(message);
		this.message = message;
		this.validationErrors = validationErrors;
	}
}

/** Validation error. */
export interface ValidationError {

	/** Code of error. Example: authentication_failed. */
	readonly code: string;

	/** Error message. */
	readonly message: string;
}
