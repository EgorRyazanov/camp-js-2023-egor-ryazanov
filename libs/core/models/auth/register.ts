/** Register. */
export class Register {
	/** Email. */
	public readonly email: string;

	/** Firstname. */
	public readonly firstName: string;

	/** Lastname. */
	public readonly lastName: string;

	/** Password. */
	public readonly password: string;

	public constructor(data: Register) {
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.password = data.password;
	}
}
