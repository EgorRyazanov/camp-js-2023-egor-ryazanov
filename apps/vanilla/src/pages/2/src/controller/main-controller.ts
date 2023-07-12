import { render } from '../utils';
import { ListView } from '../views/players-container-view';
import { PLayerView } from '../views/player-view';
import { PlayerGenerator } from '../generators/player-generator';
import { RollButtonView } from '../views/roll-button-view';
import { TurnGenerator } from '../generators/turn-generator';
import { DiceGenerator } from '../generators/dice-generator';
import { ScoresView } from '../views/scores-view';

export class Controller {
  private app: HTMLElement;
  private playersContainer: ListView;
  private rollButton: RollButtonView;
  public readonly playersModels: PlayerGenerator[];
  public readonly playersViews: PLayerView[];

  public readonly turnGenerator: TurnGenerator;
  public readonly diceGenerator: DiceGenerator;
  public readonly scoresView: ScoresView;

  public constructor(app: HTMLElement, playersContainer: ListView, playersNames: string[]) {
    this.app = app;
    this.playersContainer = playersContainer;
    this.playersModels = [];
    this.playersViews = [];
    this.scoresView = new ScoresView();
    this.rollButton = new RollButtonView();

    this.turnGenerator = new TurnGenerator(playersNames.length);
    this.diceGenerator = new DiceGenerator();
    this.turnGenerator.subscribe(this.diceGenerator);
    this.diceGenerator.subscribe(this.scoresView)

    this.rollButton.addEvents(['click', this.turnGenerator.next]);

    playersNames.forEach((playerName, index) => {
      this.playersModels.push(new PlayerGenerator(playerName, index));
      this.diceGenerator.subscribe(this.playersModels[index]);
    });
    this.playersModels.forEach((playerModel) => {
      const playerView = new PLayerView(playerModel.points, playerModel.name);
      this.playersViews.push(playerView);
      playerModel.subscribe(playerView);
    });
  }

  public init() {
    render(this.app, this.playersContainer.getElement());
    this.playersViews.forEach((playerView) => render(this.playersContainer.getElement(), playerView.getElement()));
    render(this.app, this.rollButton.getElement());
    render(this.app, this.scoresView.getElement())
  }
}
