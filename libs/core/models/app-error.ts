/** App error. */
export class AppError extends Error {
	/** Message. */
	public override readonly message: string;

	/** Key. Example: password, email. */
	public readonly key: string;

	/** Code. Example: invalid, permission denied.  */
	public readonly code: string;

	public constructor(message: string, key: string, code: string) {
		super(message);
		this.message = message;
		this.key = key;
		this.code = code;
	}
}
