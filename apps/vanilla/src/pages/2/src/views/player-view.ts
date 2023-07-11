import { createELement } from '../utils';

const listTemplate = (points: Array<number>, name: string) => `<div class="player"> ${name} - ${points}  123</div>`;

export class PLayerView {
  private element: HTMLElement;
  private readonly points: Array<number>;
  private name: string;

  public getTemplate() {
    return listTemplate(this.points, this.name);
  }

  public updateComponent(value: number) {
    this.points.push(value);
    this.element = createELement(this.getTemplate());
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
