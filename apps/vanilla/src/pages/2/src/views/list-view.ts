const listTemplate = () => `<div>12331231</div>`;

interface IListView {
  template: string;
}

class ListView implements IListView {
  readonly template;

  constructor() {
    this.template = listTemplate();
  }
}
