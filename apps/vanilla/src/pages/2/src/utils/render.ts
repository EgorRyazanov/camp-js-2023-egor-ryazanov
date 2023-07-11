export enum TPosition {
  beforebegin = "beforebegin",
  afterbegin = "afterbegin",
  beforeend = "beforeend",
  afterend = "afterend"
}


export function render (container: HTMLElement, child: HTMLElement, position: TPosition = TPosition.beforeend) {
  if (container && child) {
    container.insertAdjacentElement(position, child)
  }
}
