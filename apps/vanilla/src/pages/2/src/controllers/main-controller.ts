import { render } from '../utils';
import { PlayerContainerView,  ScoresContainerView, TitleView, TotalScoresView,  RollButtonView, PlayerView } from '../views';
import { PlayerGenerator, TurnGenerator, DiceGenerator } from '../generators';

export class Controller {
  private app: HTMLElement;
  private playersContainer: PlayerContainerView;
  private rollButton: RollButtonView;
  public readonly playersModels: PlayerGenerator[];
  public readonly playersViews: PlayerView[];
  public readonly totalScoresView: TotalScoresView;
  public readonly title: TitleView;
  public readonly scoresContainerView: ScoresContainerView;

  public readonly turnGenerator: TurnGenerator;
  public readonly diceGenerator: DiceGenerator;

  public constructor(app: HTMLElement, playersContainer: PlayerContainerView, playersNames: string[]) {
    this.app = app;
    this.playersContainer = playersContainer;
    this.playersModels = [];
    this.playersViews = [];
    this.totalScoresView = new TotalScoresView();
    this.rollButton = new RollButtonView();
    this.title = new TitleView("Blackjack game")
    this.scoresContainerView = new ScoresContainerView();

    this.turnGenerator = new TurnGenerator(playersNames.length);
    this.diceGenerator = new DiceGenerator();
    this.turnGenerator.subscribe(this.diceGenerator);
    this.diceGenerator.subscribe(this.totalScoresView);

    this.rollButton.addEvents(['click', this.turnGenerator.next]);

    playersNames.forEach((playerName, index) => {
      this.playersModels.push(new PlayerGenerator(playerName, index));
      this.diceGenerator.subscribe(this.playersModels[index]);
    });
    this.playersModels.forEach((playerModel) => {
      const playerView = new PlayerView(playerModel.points, playerModel.name);
      this.playersViews.push(playerView);
      playerModel.subscribe(playerView);
    });
  }

  public init() {
    render(this.app, this.title.getElement());
    render(this.app, this.rollButton.getElement());
    render(this.app, this.scoresContainerView.getElement())
    render(this.scoresContainerView.getElement(), this.playersContainer.getElement());
    this.playersViews.forEach((playerView) => render(this.playersContainer.getElement(), playerView.getElement()));
    render(this.scoresContainerView.getElement(), this.totalScoresView.getElement());
  }
}
