import { View } from './view';

/**Container for players scores views and total score view. */
export class ScoresContainerView extends View {
  /** Html element. */
  protected override element: HTMLElement;

  public constructor() {
    super();
    this.element = this.getElement();
  }

  /** Returns template of view. */
  public override getTemplate() {
    return `<div class="game__scores"></div>`;
  }
}
