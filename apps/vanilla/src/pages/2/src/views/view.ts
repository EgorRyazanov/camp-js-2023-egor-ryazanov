import { createELement } from '../utils';

/** View. */
export abstract class View {
  /** Html element. */
  protected abstract element: HTMLElement;

  /** Returns template of view. */
  abstract getTemplate(): string;

  /** Returns html element based on template.  */
  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }
}
