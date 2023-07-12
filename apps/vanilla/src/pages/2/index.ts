import { Controller } from "./src/controllers";
import { PlayerContainerView } from './src/views/players-container-view';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const container = new PlayerContainerView();
  const players = ['John', 'Jack'];
  if (app) {
    const controller = new Controller(app, container, players);
    controller.init();
  }
});
