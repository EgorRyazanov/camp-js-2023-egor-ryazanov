import { View } from './view';

/** View to display title of app. */
export class TitleView extends View {
	/** HTML element. */
	protected override element: HTMLElement;

	/** Title. */
	private readonly title: string;

	public constructor(title: string) {
		super();
		this.title = title;
		this.element = this.generateElement();
	}

	/** Returns template of view. */
	public override get template(): string {
		return `<h1 class="game__title title">${this.title}</h1>`;
	}
}
