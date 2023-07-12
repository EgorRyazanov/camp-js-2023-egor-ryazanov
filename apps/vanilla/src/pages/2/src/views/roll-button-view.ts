import { createELement } from '../utils';

export class RollButtonView {
  private element: HTMLElement;

  public getTemplate() {
    return `<button class="primary-button game__roll-button">Make roll</button>`;
  }

  public addEvents = (...args: Array<[string, () => void]>) => {
    args.forEach((callback) => {
      this.getElement().addEventListener(callback[0], callback[1]);
    });
  };

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
