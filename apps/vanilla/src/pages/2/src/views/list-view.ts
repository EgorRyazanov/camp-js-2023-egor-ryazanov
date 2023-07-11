import { createELement } from '../utils';

const listTemplate = (array: Array<string>) => `<div>${array}</div>`;

export class ListView {
  private element: HTMLElement;
  private readonly array: Array<string>;

  public getTemplate() {
    return listTemplate(this.array);
  }

  public updateComponent(value: string) {
    this.array.push(value);
    this.element = createELement(this.getTemplate());
  }

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }

  constructor(array: Array<string>) {
    this.array = array;
    this.element = this.getElement();
  }
}
