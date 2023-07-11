import { render } from '../utils';
import { ListView } from '../views/list-view';
import { PLayerView } from '../views/player-view';
import { PlayerModel } from '../model/player-model';
import { RollButtonView } from '../views/roll-button-view';

export class Controller {
  private container: ListView;
  private app: HTMLElement;
  public readonly playersModels: PlayerModel[];
  public readonly playersViews: PLayerView[];
  private button: RollButtonView;
  constructor(app: HTMLElement, container: ListView, players: string[]) {
    this.app = app;
    this.container = container;
    this.playersModels = [];
    this.playersViews = [];
    this.button = new RollButtonView();
    this.button.addEvents(["click", () => console.log(123)])
    players.forEach((playerName) => this.playersModels.push(new PlayerModel(playerName)));
    this.playersModels.forEach((player) => {
      this.playersViews.push(new PLayerView(player.points, player.name));
    });
  }

  public update() {
    this.container.updateComponent('123');
    // this.app.innerHTML = ""

    render(this.app, this.container.getElement());
  }

  public init() {
    render(this.app, this.container.getElement());
    this.playersViews.forEach((playerView) => render(this.container.getElement(), playerView.getElement()));
    render(this.app, this.button.getElement())
    // this.playersModels.forEach((player) => {
    //   render(this.container.getElement(), new PLayerView(player.points).getElement());
    // });
  }
}
