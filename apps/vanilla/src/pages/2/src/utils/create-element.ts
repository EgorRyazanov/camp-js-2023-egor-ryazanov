/**
 * Function that create dom element based on string template.
 * @param template html template.
 */
export function createELement(template: string): HTMLElement {
  const element = document.createElement('div');
  element.innerHTML = template;
  return element.firstChild as HTMLElement;
}
