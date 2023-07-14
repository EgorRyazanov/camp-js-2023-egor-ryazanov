/** Positions to render element in different places relative to the parent. */
export type Position = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

/**
 * Inserts HTML element to another HTML element.
 * @param container Parent HTML element where we will insert child HTML element.
 * @param child Child HTML element that will be inserted in parent.
 * @param position Position of child relative to the parent.
 */
export function render(container: HTMLElement, child: HTMLElement, position: Position = 'beforeend'): void {
	container.insertAdjacentElement(position, child);
}
