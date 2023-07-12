import { Observer } from './types';

export class Publisher<T> {
  protected readonly subscribers: Observer<T>[] = [];
  public subscribe(subscriber: Observer<T>) {
    const subIdx = this.subscribers.findIndex((sub) => sub === subscriber);
    if (subIdx === -1) {
      this.subscribers.push(subscriber);
    }
  }

  public unsubscribe(subscriber: Observer<T>) {
    const subIdx = this.subscribers.findIndex((sub) => sub === subscriber);
    if (subIdx !== -1) {
      this.subscribers.splice(subIdx, 1);
    }
  }

  public notify(value: T): void {
    this.subscribers.forEach((sub) => sub.update(value));
  }
}
