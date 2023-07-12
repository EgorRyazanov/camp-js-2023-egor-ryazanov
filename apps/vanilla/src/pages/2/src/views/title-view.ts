import { createELement } from '../utils';

export class TitleView {
  private element: HTMLElement;
  private title: string;

  public getTemplate() {
    return `<h1 class="game__title title">${this.title}</h1>`;
  }

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }

  public constructor(title: string) {
    this.title = title;
    this.element = this.getElement();
  }
}
