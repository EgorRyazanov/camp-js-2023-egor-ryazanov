import { createELement } from '../utils';

export class PlayerContainerView {
  private element: HTMLElement;

  public getTemplate() {
    return `<ul class="scores__players"></ul>`;
  }

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }

  public constructor() {
    this.element = this.getElement();
  }
}
