import { IDiceResult, IObserver } from '../generators/types';
import { createELement, getSum, rerender } from '../utils';
import { View } from './view';

export class TotalScoresView extends View implements IObserver<IDiceResult> {
  private points: Array<number>;

  public getTemplate() {
    console.log(this.points)
    return `<div class="scores__total">
      <h4 class="total__title">Total</h4>
      <h4 class="total__scores">${getSum(this.points) || []}</h4>
      <div class="total__text-container">
        <p class="total__text">${this.points.join(' ')}</p>
      </div>
    </div>`;
  }

  override initProps(props: any): void {
    this.points = props.points;
  }

  update(value: IDiceResult) {
    this.points.push(value.result);
    const targetElement = this.element;
    const newElement = createELement(this.getTemplate());
    rerender(targetElement, newElement);
    this.element = newElement;
  }

  public constructor(points: Array<number> = []) {
    super({props: this.points});
    this.points = points;
    this.element = this.getElement();
  }
}
