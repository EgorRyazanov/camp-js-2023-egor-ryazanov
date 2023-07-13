/* eslint-disable */
// Disabled eslint because names reflect the actual naming of the items fixed on the documentation.
// I can't change them to pascal case.
/** Enum of positions to render element in different places relative to the parent. */
export enum TPosition {
	beforebegin = 'beforebegin',
	afterbegin = 'afterbegin',
	beforeend = 'beforeend',
	afterend = 'afterend',
}
/* eslint-enable */

/**
 * Inserts html element to another html element.
 * @param container Parent html element where we will insert child html element.
 * @param child Child html element that will be inserted in parent.
 * @param position Position of child relative to the parent.
 */
export function render(container: HTMLElement, child: HTMLElement, position: TPosition = TPosition.beforeend): void {
	if (container && child) {
		container.insertAdjacentElement(position, child);
	}
}
