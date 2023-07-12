import { View } from './view';

/**Container view for players. */
export class PlayerContainerView extends View {
  /** Html element. */
  protected override element: HTMLElement;

  public constructor() {
    super();
    this.element = this.getElement();
  }

  /** Returns template of view. */
  public override getTemplate() {
    return `<ul class="scores__players"></ul>`;
  }
}
