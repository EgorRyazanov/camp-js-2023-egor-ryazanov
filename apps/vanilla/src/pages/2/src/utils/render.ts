// Disabled eslint because names reflect the actual naming of the items fixed on the documentation.
// I can't change them to pascal case.
/** Enum of positions to render element in different places relative to the parent. */
export enum TPosition {
	// eslint-disable-next-line camelcase
	beforebegin = 'beforebegin',
	// eslint-disable-next-line camelcase
	afterbegin = 'afterbegin',
	// eslint-disable-next-line camelcase
	beforeend = 'beforeend',
	// eslint-disable-next-line camelcase
	afterend = 'afterend',
}

/**
 * Inserts html element to another html element.
 * @param container Parent html element where we will insert child html element.
 * @param child Child html element that will be inserted in parent.
 * @param position Position of child relative to the parent.
 */
export function render(container: HTMLElement, child: HTMLElement, position: TPosition = TPosition.beforeend): void {
	container.insertAdjacentElement(position, child);
}
