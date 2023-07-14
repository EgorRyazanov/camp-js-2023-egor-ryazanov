import { View } from './view';

/** Container for players scores views and total score view. */
export class ScoresContainerView extends View {
	/** HTML element. */
	protected element: HTMLElement;

	public constructor() {
		super();
		this.element = this.generateElement();
	}

	/** Returns template of view. */
	public override get template(): string {
		return `<div class="game__scores"></div>`;
	}
}
