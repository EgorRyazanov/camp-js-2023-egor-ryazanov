export enum TPosition {
  beforebegin = "beforebegin",
  afterbegin = "afterbegin",
  beforeend = "beforeend",
  afterend = "afterend"
}

export function render (container: HTMLElement, child: string, position: TPosition = TPosition.beforeend) {
  if (container && child) {
    container.insertAdjacentHTML(position, child)
  }
}
