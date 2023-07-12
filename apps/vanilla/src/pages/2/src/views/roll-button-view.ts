import { View } from './view';

export class RollButtonView extends View {
  protected override element: HTMLElement;

  public override getTemplate() {
    return `<button class="primary-button game__roll-button">Make roll</button>`;
  }

  public addEvents = (...args: Array<[string, () => void]>) => {
    args.forEach((callback) => {
      this.getElement().addEventListener(callback[0], callback[1]);
    });
  };

  public constructor() {
    super();
    this.element = this.getElement();
  }
}
