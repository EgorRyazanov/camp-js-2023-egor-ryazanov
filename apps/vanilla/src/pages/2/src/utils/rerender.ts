/**
 * Function to replace old html element to updated html element.
 * @param targetElement current version of html element.
 * @param newElement new version of html element.
 */
export function rerender(targetElement: HTMLElement, newElement: HTMLElement) {
  targetElement.replaceWith(newElement);
}
