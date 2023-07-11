import { render } from '../utils';
import { ListView } from '../views/players-container-view';
import { PLayerView } from '../views/player-view';
import { PlayerModel } from '../generators/player-generator';
import { RollButtonView } from '../views/roll-button-view';
import { TurnGenerator } from '../generators/turn-generator';
import { DiceGenerator } from '../generators/dice-generator';
import { ScoresView } from '../views/scores-view';

export class Controller {
  private app: HTMLElement;
  private playersContainer: ListView;
  private rollButton: RollButtonView;
  public readonly playersModels: PlayerModel[];
  public readonly playersViews: PLayerView[];

  public readonly turnGenerator: TurnGenerator;
  public readonly diceGenerator: DiceGenerator;
  public readonly scoresView: ScoresView;

  constructor(app: HTMLElement, playersContainer: ListView, playersNames: string[]) {
    this.app = app;
    this.playersContainer = playersContainer;
    this.playersModels = [];
    this.playersViews = [];
    this.scoresView = new ScoresView();
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
    render(this.app, this.playersContainer.getElement());
    this.playersViews.forEach((playerView) => render(this.playersContainer.getElement(), playerView.getElement()));
    render(this.app, this.rollButton.getElement());
  }
}
