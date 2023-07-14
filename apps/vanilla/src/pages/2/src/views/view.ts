import { createElement } from '../utils';

/** View. */
export abstract class View {
	/** Returns template of view. */
	public abstract get template(): string;

	/** HTML element. */
	protected abstract element: HTMLElement;

	/** Returns HTML element */
	public getElement(): HTMLElement {
		return this.element;
	}

	/**
	 * Generates HTML element based on template
	 * @param template new template for view
	 */
	protected generateElement(template?: string) {
		if (template) {
			return createElement(template);
		}
		return createElement(this.template);
	}
}
