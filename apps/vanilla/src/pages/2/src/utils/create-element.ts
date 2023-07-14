/**
 * Creates dom element based on string template.
 * @param template HTML template.
 */
export function createElement(template: string): HTMLElement {
	const element = document.createElement('div');
	element.innerHTML = template;
	return element.firstChild as HTMLElement;
}
