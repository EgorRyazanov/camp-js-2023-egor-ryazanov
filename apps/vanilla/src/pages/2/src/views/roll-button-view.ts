import { createELement } from '../utils';

const listTemplate = () => `<button>Make roll</button>`;

export class RollButtonView {
  private element: HTMLElement;

  public getTemplate() {
    return listTemplate();
  }

  public addEvents = (...args: Array<[string, () => void]>) => {
    args.forEach(callback => {
      this.getElement().addEventListener(callback[0], callback[1])
    })
  };

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
