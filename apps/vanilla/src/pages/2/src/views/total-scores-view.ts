import { RoundResult, Observer } from '../generators/types';
import { createELement, getSum, rerender } from '../utils';

import { View } from './view';

/** View to display the total points of all players together.  */
export class TotalScoresView extends View implements Observer<RoundResult> {
	/** Points of all players together.  */
	private points: number[];

	/** Html element. */
	protected override element: HTMLElement;

	public constructor(points: number[] = []) {
		super();
		this.points = points;
		this.element = this.getElement();
	}

	/** Returns template of view. */
	public override getTemplate(): string {
		return `<div class="scores__total">
      <h4 class="total__title">Total</h4>
      <h4 class="total__scores">${getSum(this.points)}</h4>
      <div class="total__text-container">
        <p class="total__text">${(this.points).join(' ')}</p>
      </div>
    </div>`;
	}

	/**
	 * Updates total scores view and rerender html element.
	 * @param value Total information about current turn.
	 */
	public update(value: RoundResult): void {
		this.points.push(value.turnPoints);
		const targetElement = this.element;
		const newElement = createELement(this.getTemplate());
		rerender(targetElement, newElement);
		this.element = newElement;
	}
}
