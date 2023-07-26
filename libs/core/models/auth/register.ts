import { Immerable, OmitImmerable } from '../immerable';

/** Register. */
export class Register extends Immerable {
	/** Email. */
	public readonly email: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	/** Avatar. */
	public readonly avatar: string;

	/** Password. */
	public readonly password: string;

	public constructor(data: RegisterConstructorData) {
		super();
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.avatar = data.avatar;
		this.password = data.password;
	}
}

/** Register constructor type. */
type RegisterConstructorData = OmitImmerable<Register>;
