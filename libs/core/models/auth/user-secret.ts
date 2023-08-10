/** User secret. */
export class UserSecret {
	/** Access token. */
	public readonly accessToken: string;

	/** Refresh token. */
	public readonly refreshToken: string;

	public constructor(data: UserSecret) {
		this.accessToken = data.accessToken;
		this.refreshToken = data.refreshToken;
	}
}
