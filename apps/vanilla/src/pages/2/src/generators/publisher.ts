import { IObserver } from './types';

export class Publisher<T> {
  protected readonly subscribers: IObserver<T>[] = [];
  public subscribe(subscriber: IObserver<T>) {
    const subIdx = this.subscribers.findIndex((sub) => sub === subscriber);
    if (subIdx === -1) {
      this.subscribers.push(subscriber);
    }
  }

  public unsubscribe(subscriber: IObserver<T>) {
    const subIdx = this.subscribers.findIndex((sub) => sub === subscriber);
    if (subIdx !== -1) {
      this.subscribers.splice(subIdx, 1);
    }
  }

  public notify(value: T): void {
    this.subscribers.forEach((sub) => sub.update(value));
  }
}
