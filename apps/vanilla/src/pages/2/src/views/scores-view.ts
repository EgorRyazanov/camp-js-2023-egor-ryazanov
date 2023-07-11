import { IDisplayData } from '../generators/player-generator';
import { createELement, rerender } from '../utils';
import { IObserver } from '../generators/publisher';

const scoresTemplate = (points: Array<number>) => {
  return `<div class="scores">${points}</div>`;
};

export class ScoresView implements IObserver<IDisplayData> {
  private element: HTMLElement;
  private points: Array<number>;

  public getTemplate() {
    return scoresTemplate(this.points);
  }

  update(value: IDisplayData) {
    this.points = value.points;
    const targetElement = this.element;
    const newElement = createELement(scoresTemplate(this.points));
    rerender(targetElement, newElement);
    this.element = newElement;
  }

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }

  constructor(points: Array<number> = []) {
    this.points = points;
    this.element = this.getElement();
  }
}
