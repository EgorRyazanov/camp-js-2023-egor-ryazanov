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

/** Controller. */
export class GameController {
	/** Container of app. */
	private readonly appElement: HTMLElement;

	/**  Container for players. */
	private readonly playersContainerView: PlayerContainerView;

	/** Button that generate game turn. */
	private readonly rollButtonView: RollButtonView;

	/** Array of player generators. */
	private readonly playersGenerators: readonly PlayerGenerator[];

	/** Array of player views. */
	private readonly playersViews: readonly PlayerView[];

	/** View to display the total points of all players together. */
	private readonly totalScoresView: TotalScoresView;

	/** View to display title of app. */
	private readonly titleView: TitleView;

	/** Container for players scores views and total score view. */
	private readonly scoresContainerView: ScoresContainerView;

	/** Turn generator. */
	private readonly turnGenerator: TurnGenerator;

	/** Dice generator. */
	private readonly diceGenerator: DiceGenerator;

	public constructor(appElement: HTMLElement, playersContainerView: PlayerContainerView, playersNames: string[]) {
		this.appElement = appElement;
		this.playersContainerView = playersContainerView;
		this.totalScoresView = new TotalScoresView();
		this.rollButtonView = new RollButtonView();
		this.titleView = new TitleView('Blackjack game');
		this.scoresContainerView = new ScoresContainerView();
		this.turnGenerator = new TurnGenerator(playersNames.length);
		this.diceGenerator = new DiceGenerator();
		this.playersGenerators = this.createPlayerGenerators(playersNames);
		this.playersViews = this.createPlayersViews();
	}

	/** Adds all the HTML elements on the page and starts the program. */
	public init(): void {
		this.makeEventSubscribes();
		render(this.appElement, this.titleView.getElement());
		render(this.appElement, this.rollButtonView.getElement());
		render(this.appElement, this.scoresContainerView.getElement());
		render(this.scoresContainerView.getElement(), this.playersContainerView.getElement());
		this.playersViews.forEach(playerView => render(this.playersContainerView.getElement(), playerView.getElement()));
		render(this.scoresContainerView.getElement(), this.totalScoresView.getElement());
	}

	/**
	 * Creates array of players generators.
	 * @param playersNames Players names.
	 */
	private createPlayerGenerators(playersNames: string[]): PlayerGenerator[] {
		const playersGeneratorsTemp: PlayerGenerator[] = [];
		playersNames.forEach((playerName, index) => {
			playersGeneratorsTemp.push(new PlayerGenerator(playerName, index));
		});
		return playersGeneratorsTemp;
	}

	/** Creates array of players views. */
	private createPlayersViews(): PlayerView[] {
		const playersViewsTemp: PlayerView[] = [];
		this.playersGenerators.forEach(playerModel => {
			const playerView = new PlayerView(playerModel.points, playerModel.name);
			playersViewsTemp.push(playerView);
			playerModel.subscribe(playerView);
		});
		return playersViewsTemp;
	}

	/** Makes needed subscribes and add events. */
	private makeEventSubscribes(): void {
		this.turnGenerator.subscribe(this.diceGenerator);
		this.diceGenerator.subscribe(this.totalScoresView);
		this.rollButtonView.addEvents([{ name: 'click', callback: () => this.turnGenerator.next() }]);
		this.playersGenerators.forEach(playerGenerator => this.diceGenerator.subscribe(playerGenerator));
	}
}
