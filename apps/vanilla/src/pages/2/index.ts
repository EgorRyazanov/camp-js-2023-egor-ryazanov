import { Controller } from './src/controller/main-controller';
import { ListView } from './src/views/players-container-view';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const container = new ListView();
  const players = ['Егор', 'Иван'];
  if (app) {
    const controller = new Controller(app, container, players);
    controller.init();
    // controller.update()
  }
});
