import { View } from './view';

/** Container view for players. */
export class PlayerContainerView extends View {
	/** HTML element. */
	protected override element: HTMLElement;

	public constructor() {
		super();
		this.element = this.generateElement();
	}

	/** Returns template of view. */
	public override get template(): string {
		return `<ul class="scores__players"></ul>`;
	}
}
