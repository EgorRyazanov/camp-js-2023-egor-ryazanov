/** Enum of positions to render element in different places relative to the parent. */
export enum TPosition {
  beforebegin = 'beforebegin',
  afterbegin = 'afterbegin',
  beforeend = 'beforeend',
  afterend = 'afterend',
}

/**
 * Function to insert html element to another html element.
 * @param container parent html element where we will insert child html element.
 * @param child child html element that will be inserted in parent.
 * @param position position of child relative to the parent.
 */
export function render(container: HTMLElement, child: HTMLElement, position: TPosition = TPosition.beforeend) {
  if (container && child) {
    container.insertAdjacentElement(position, child);
  }
}
