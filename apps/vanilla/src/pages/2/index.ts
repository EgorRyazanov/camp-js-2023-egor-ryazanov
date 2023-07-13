import { Controller } from './src/controllers';
import { PlayerContainerView } from './src/views/players-container-view';

window.addEventListener('DOMContentLoaded', () => {
	const appElement = document.getElementById('app');
	const playerContainerView = new PlayerContainerView();
	const playersNames = ['John', 'Jack'];
	if (appElement) {
		const controller = new Controller(appElement, playerContainerView, playersNames);
		controller.init();
	}
});
