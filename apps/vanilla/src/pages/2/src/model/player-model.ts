export class PlayerModel {
  public readonly name: string;
  private _points: number[];

  public get points(): number[] {
    return this._points;
  }

  public set points(value: number) {
    this._points.push(value)
  };

  constructor(name: string) {
    this.name = name;
    this._points = [];
  }
}
