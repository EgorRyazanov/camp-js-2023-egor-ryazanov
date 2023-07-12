import { createELement } from '../utils';

export abstract class View {
  protected abstract element: HTMLElement;

  abstract getTemplate(): string;

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }
}
