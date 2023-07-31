export class AppError extends Error {
	public override readonly message: string;
	public readonly key: string;
	public readonly code: string;

	public constructor(message: string, key: string, code: string) {
		super(message);
		this.message = message;
		this.key = key;
		this.code = code;
	}
}

export type AppErrors = Record<string, AppError[]>;
