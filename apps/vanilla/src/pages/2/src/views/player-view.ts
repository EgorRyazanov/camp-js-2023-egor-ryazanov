import { DisplayTurn, Observer } from '../generators/types';
import { getSum, rerender, createELement } from '../utils';

import { View } from './view';

/** PLayer view. */
export class PlayerView extends View implements Observer<DisplayTurn> {
	/** Html element. */
	protected override element: HTMLElement;

	/** Array of game points. */
	private points: Array<number>;

	/** Player name. */
	private readonly name: string;

	public constructor(points: Array<number>, name: string) {
		super();
		this.points = points;
		this.name = name;
		this.element = this.getElement();
	}

	/**
	 * Returns player template that accepts arguments.
	 * @param isWin Win player status.
	 * @param isNext Status that means player will make turn in next round.
	 */
	private getPlayerTemplate(isWin = false, isNext = false): string {
		return `<li class="scores__player player">
      <h4 class="player__name ${isNext ? 'player__name_next' : ''}">${this.name}</h4>
      <h4 class="player__scores">Scores: ${getSum(this.points)}</h4>
      <div class="player__text-container ${isWin ? 'player__text-container_win' : ''}">
        <p class="player__text text">${this.points.join(' ')}</p>
      <div>
    </li>`;
	}

	/** Returns template of view.  */
	public override getTemplate(): string {
		return this.getPlayerTemplate();
	}

	/**
	 *  Update player view and rerender it.
	 * @param value Player display information.
	 */
	public update(value: DisplayTurn): void {
		this.points = value.points;
		const targetElement = this.element;
		const newElement = createELement(this.getPlayerTemplate(value.isWin, value.isNext));
		rerender(targetElement, newElement);
		this.element = newElement;
	}
}
