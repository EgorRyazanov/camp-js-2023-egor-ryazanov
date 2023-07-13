/**
 * Replaces old html element to updated html element.
 * @param targetElement Current version of html element.
 * @param newElement New version of html element.
 */
export function rerender(targetElement: HTMLElement, newElement: HTMLElement): void {
	targetElement.replaceWith(newElement);
}
