export class Controller {
  private container;
  private app: any;
  private players: any;
  constructor(app: HTMLElement, container: any, players: any) {
    this.app = app;
    this.container = container;
    this.players = players
  }
  render(app, container.template)
}
