import { createELement } from '../utils';

export abstract class View {
  protected element: HTMLElement;

  abstract initProps(props: any): void;

  abstract getTemplate(): string;

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }

  public constructor(props?: any) {
    this.initProps(props);
    this.element = this.getElement();
  }
}
