import { View } from './view';

export class TitleView extends View {
  protected override element: HTMLElement;
  private title: string;

  public override getTemplate() {
    return `<h1 class="game__title title">${this.title}</h1>`;
  }

  public constructor(title: string) {
    super()
    this.title = title;
    this.element = this.getElement()
  }
}
