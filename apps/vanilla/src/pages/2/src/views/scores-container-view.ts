import { View } from './view';

export class ScoresContainerView extends View {
  protected override element: HTMLElement;

  public override getTemplate() {
    return `<div class="game__scores"></div>`;
  }

  public constructor() {
    super();
    this.element = this.getElement();
  }
}
