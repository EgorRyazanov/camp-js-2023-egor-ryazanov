import { View } from './view';

/** Events. */
interface ListenerEvents {

	/** Name of event. */
	readonly name: string;

	/** Callback of event. */
	readonly callback: () => void;
}

/** View of button that generate game turn. */
export class RollButtonView extends View {
	/** HTML element. */
	protected override element: HTMLElement;

	/** Events. */
	private readonly events: ListenerEvents[];

	public constructor() {
		super();
		this.element = this.generateElement();
		this.events = [];
	}

	/** Returns template of view. */
	public override get template(): string {
		return `<button class="primary-button game__roll-button">Make roll</button>`;
	}

	/**
	 * Add events to button.
	 * @param newEvents Array of ListenerEvents entities.
	 */
	public addEvents(newEvents: ListenerEvents[]): void {
		newEvents.forEach(event => {
			this.element.addEventListener(event.name, event.callback);
			this.events.push(event);
		});
	}

	/** Removes events listeners. */
	public removeEvents(): void {
		this.events.forEach(event => {
			this.element.removeEventListener(event.name, event.callback);
		});
	}
}
