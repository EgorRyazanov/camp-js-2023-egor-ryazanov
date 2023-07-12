import { render } from '../utils';
import {
  PlayerContainerView,
  ScoresContainerView,
  TitleView,
  TotalScoresView,
  RollButtonView,
  PlayerView,
} from '../views';
import { PlayerGenerator, TurnGenerator, DiceGenerator } from '../generators';

/** Controller.  */
export class Controller {
  /** Container of app. */
  private app: HTMLElement;

  /**  Container for players. */
  private playersContainer: PlayerContainerView;

  /** Button that generate game turn. */
  private rollButton: RollButtonView;

  /** Array of player generators. */
  private readonly playersGenerators: PlayerGenerator[];

  /** Array of player views. */
  private readonly playersViews: PlayerView[];

  /** View to display the total points of all players together. */
  private readonly totalScoresView: TotalScoresView;

  /** View to display title of app. */
  private readonly title: TitleView;

  /** Container for players scores views and total score view. */
  private readonly scoresContainerView: ScoresContainerView;

  /** Turn generator. */
  private readonly turnGenerator: TurnGenerator;

  /** Dice generator. */
  private readonly diceGenerator: DiceGenerator;

  public constructor(app: HTMLElement, playersContainer: PlayerContainerView, playersNames: string[]) {
    this.app = app;
    this.playersContainer = playersContainer;
    this.playersGenerators = [];
    this.playersViews = [];
    this.totalScoresView = new TotalScoresView();
    this.rollButton = new RollButtonView();
    this.title = new TitleView('Blackjack game');
    this.scoresContainerView = new ScoresContainerView();

    this.turnGenerator = new TurnGenerator(playersNames.length);
    this.diceGenerator = new DiceGenerator();
    this.turnGenerator.subscribe(this.diceGenerator);
    this.diceGenerator.subscribe(this.totalScoresView);

    this.rollButton.addEvents(['click', this.turnGenerator.next]);

    playersNames.forEach((playerName, index) => {
      this.playersGenerators.push(new PlayerGenerator(playerName, index));
      this.diceGenerator.subscribe(this.playersGenerators[index]);
    });
    this.playersGenerators.forEach((playerModel) => {
      const playerView = new PlayerView(playerModel.points, playerModel.name);
      this.playersViews.push(playerView);
      playerModel.subscribe(playerView);
    });
  }

  /** Function to add all the html elements on the page and starts the program. */
  public init() {
    render(this.app, this.title.getElement());
    render(this.app, this.rollButton.getElement());
    render(this.app, this.scoresContainerView.getElement());
    render(this.scoresContainerView.getElement(), this.playersContainer.getElement());
    this.playersViews.forEach((playerView) => render(this.playersContainer.getElement(), playerView.getElement()));
    render(this.scoresContainerView.getElement(), this.totalScoresView.getElement());
  }
}
