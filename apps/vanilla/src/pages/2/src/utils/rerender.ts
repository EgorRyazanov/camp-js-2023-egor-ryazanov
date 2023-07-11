export const rerender = (targetElement: HTMLElement, newElement: HTMLElement) => {
  targetElement.replaceWith(newElement);
};
