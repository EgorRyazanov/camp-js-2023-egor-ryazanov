import { createELement } from '../utils';


export class ScoresContainerView {
  private element: HTMLElement;

  public getTemplate() {
    return `<div class="game__scores"></div>`;
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
