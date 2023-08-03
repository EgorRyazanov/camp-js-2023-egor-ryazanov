/** App error. */
export class AppError<T extends Record<string, ValidationError[]> = Record<string, ValidationError[]>> extends Error {
	/** Message. */
	public override readonly message: string;

	public validationErrors: T;

	public constructor(message: string, validationErrors: T) {
		super(message);
		this.message = message;
		this.validationErrors = validationErrors;
	}
}

export interface ValidationError {
	readonly code: string;
	readonly message: string;
}
