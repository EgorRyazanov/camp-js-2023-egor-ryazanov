/** User secret. */
export class UserSecret {
	/** Access token. */
	public readonly access: string;

	/** Refresh token. */
	public readonly refresh: string;

	public constructor(data: UserSecret) {
		this.access = data.access;
		this.refresh = data.refresh;
	}
}
