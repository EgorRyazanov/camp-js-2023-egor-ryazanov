import { IDisplayData, IObserver } from '../generators/types';
import { createELement, getSum, rerender } from '../utils';

const getPlayerTemplate = (points: Array<number>, name: string, isWin: boolean = false, isNext: boolean = false) => {
  return `<li class="scores__player player">
    <h4 class="player__name ${isNext? "player__name_next": ""}">${name}</h4>
    <h4 class="player__scores">Scores: ${getSum(points)}</h4>
    <div class="player__text-container ${isWin ? 'player__text-container_win' : ''}">
      <p class="player__text text">${points.join(" ")}</p>
    <div>
  </li>`;
};

export class PlayerView implements IObserver<IDisplayData> {
  private element: HTMLElement;
  private points: Array<number>;
  private name: string;

  public getTemplate() {
    return getPlayerTemplate(this.points, this.name);
  }

  update(value: IDisplayData) {
    this.points = value.points;
    const targetElement = this.element;
    const newElement = createELement(getPlayerTemplate(this.points, this.name, value.isWin, value.isNext));
    rerender(targetElement, newElement);
    this.element = newElement;
  }

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }

  public constructor(points: Array<number>, name: string) {
    this.points = points;
    this.name = name;
    this.element = this.getElement();
  }
}
