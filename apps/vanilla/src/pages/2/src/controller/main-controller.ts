import { render } from '../utils';
import { ListView } from '../views/list-view';
import { PLayerView } from '../views/player-view';
import { PlayerModel } from '../generators/player-generator';
import { RollButtonView } from '../views/roll-button-view';
import { TurnGenerator } from '../generators/turn-generator';
import { DiceGenerator } from '../generators/dice-generator';

export class Controller {
  private app: HTMLElement;
  private container: ListView;
  private rollButton: RollButtonView;
  public readonly playersModels: PlayerModel[];
  public readonly playersViews: PLayerView[];

  public readonly turnGenerator: TurnGenerator;
  public readonly diceGenerator: DiceGenerator;

  constructor(app: HTMLElement, container: ListView, playersNames: string[]) {
    this.app = app;
    this.container = container;
    this.playersModels = [];
    this.playersViews = [];
    this.rollButton = new RollButtonView();

    this.turnGenerator = new TurnGenerator(playersNames.length);
    this.diceGenerator = new DiceGenerator();
    this.turnGenerator.subscribe(this.diceGenerator);

    this.rollButton.addEvents(['click', this.turnGenerator.next]);

    playersNames.forEach((playerName, index) => {
      this.playersModels.push(new PlayerModel(playerName, index));
      this.diceGenerator.subscribe(this.playersModels[index]);
    });
    this.playersModels.forEach((playerModel) => {
      const playerView = new PLayerView(playerModel.points, playerModel.name);
      this.playersViews.push(playerView);
      playerModel.subscribe(playerView);
    });
  }


  public init() {
    render(this.app, this.container.getElement());
    this.playersViews.forEach((playerView) => render(this.container.getElement(), playerView.getElement()));
    render(this.app, this.rollButton.getElement());
  }
}
