/**
 * Replaces old HTML element to updated HTML element.
 * @param targetElement Current version of HTML element.
 * @param newElement New version of HTML element.
 */
export function rerender(targetElement: HTMLElement, newElement: HTMLElement): void {
	targetElement.replaceWith(newElement);
}
