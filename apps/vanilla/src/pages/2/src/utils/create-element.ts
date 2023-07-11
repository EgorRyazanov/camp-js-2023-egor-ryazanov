export const createELement = (template: string): HTMLElement => {
  const element = document.createElement("div");
  element.innerHTML = template
  return element.firstChild as HTMLElement
}
