import { RoundResult, Observer } from '../generators/types';
import { createELement, getSum, rerender } from '../utils';
import { View } from './view';

export class TotalScoresView extends View implements Observer<RoundResult> {
  private points: Array<number>;
  protected override element: HTMLElement;

  override getTemplate() {
    return `<div class="scores__total">
      <h4 class="total__title">Total</h4>
      <h4 class="total__scores">${getSum(this.points || [])}</h4>
      <div class="total__text-container">
        <p class="total__text">${(this.points || []).join(' ')}</p>
      </div>
    </div>`;
  }

  public update(value: RoundResult) {
    this.points.push(value.result);
    const targetElement = this.element;
    const newElement = createELement(this.getTemplate());
    rerender(targetElement, newElement);
    this.element = newElement;
  }

  public constructor(points: Array<number> = []) {
    super();
    this.points = points;
    this.element = this.getElement();
  }
}
