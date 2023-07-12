import { createELement, rerender } from '../utils';
import { IObserver } from '../generators/publisher';
import { IDice } from '../generators/dice-generator';

const scoresTemplate = (points: Array<number>) => {
  return `<div class="scores">${points}</div>`;
};

export class ScoresView implements IObserver<IDice> {
  private element: HTMLElement;
  private points: Array<number>;

  public getTemplate() {
    return scoresTemplate(this.points);
  }

  update(value: IDice) {
    this.points.push(value.result)
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
