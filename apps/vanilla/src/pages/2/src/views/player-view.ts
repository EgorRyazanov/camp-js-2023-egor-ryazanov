import { IDisplayData } from '../generators/player-generator';
import { createELement, rerender } from '../utils';
import { IObserver } from '../generators/publisher';

const playerTemplate = (points: Array<number>, name: string, isWin: boolean = false) => {
  return `<div class="player ${isWin ? 'player_win' : ''}"> ${name} - ${points}</div>`;
};

export class PLayerView implements IObserver<IDisplayData> {
  private element: HTMLElement;
  private points: Array<number>;
  private name: string;

  public getTemplate() {
    return playerTemplate(this.points, this.name);
  }

  update(value: IDisplayData) {
    this.points = value.points;
    const targetElement = this.element;
    const newElement = createELement(playerTemplate(this.points, this.name, value.isWin));
    rerender(targetElement, newElement);
    this.element = newElement;
  }

  public getElement() {
    if (this.element) {
      return this.element;
    }
    return createELement(this.getTemplate());
  }

  constructor(points: Array<number>, name: string) {
    this.points = points;
    this.name = name;
    this.element = this.getElement();
  }
}
