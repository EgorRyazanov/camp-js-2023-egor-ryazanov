import { GameController } from './src/controllers';
import { PlayerContainerView } from './src/views/players-container-view';

window.addEventListener('DOMContentLoaded', () => {
	const appElement = document.querySelector<HTMLDivElement>('#app');
	const playerContainerView = new PlayerContainerView();
	const playersNames = ['John', 'Jack'];

	if (appElement == null) {
		throw Error('Element not found');
	}

	const controller = new GameController(appElement, playerContainerView, playersNames);
	controller.init();
});
