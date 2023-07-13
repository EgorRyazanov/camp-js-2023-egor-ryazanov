import { View } from './view';

/** View of button that generate game turn. */
export class RollButtonView extends View {
	/** Html element. */
	protected override element: HTMLElement;

	public constructor() {
		super();
		this.element = this.getElement();
	}

	/** Returns template of view. */
	public override getTemplate(): string {
		return `<button class="primary-button game__roll-button">Make roll</button>`;
	}

	/**
	 * Add events to button.
	 *  @param args Array of events and callbacks.
	 */
	public addEvents(...args: Array<[string, () => void]>): void {
		args.forEach(callback => {
			this.getElement().addEventListener(callback[0], callback[1]);
		});
	}
}
