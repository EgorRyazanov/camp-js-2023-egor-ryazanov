import { View } from './view';

export class PlayerContainerView extends View {
  protected override element: HTMLElement;

  public override getTemplate() {
    return `<ul class="scores__players"></ul>`;
  }

  public constructor() {
    super();
    this.element = this.getElement();
  }
}
