import { createELement } from '../utils';

const listTemplate = () => `<ul class="players-list"></ul>`;

export class ListView {
  private element: HTMLElement;

  public getTemplate() {
    return listTemplate();
  }

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }

  constructor() {
    this.element = this.getElement();
  }
}
