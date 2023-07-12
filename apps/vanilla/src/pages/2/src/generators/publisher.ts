import { Observer } from './types';

/** Publisher. */
export class Publisher<T> {
  /** Subscribers */
  protected readonly subscribers: Observer<T>[] = [];

  /**
   * Method to subscribe to be notified about changes
   * @param subscriber Entity that satisfies the interface
   */
  public subscribe(subscriber: Observer<T>) {
    const subIdx = this.subscribers.findIndex((sub) => sub === subscriber);
    if (subIdx === -1) {
      this.subscribers.push(subscriber);
    }
  }
  /**
   * Method to unsubscribe to not be notified about changes
   * @param subscriber Entity that satisfies the interface
   */
  public unsubscribe(subscriber: Observer<T>) {
    const subIdx = this.subscribers.findIndex((sub) => sub === subscriber);
    if (subIdx !== -1) {
      this.subscribers.splice(subIdx, 1);
    }
  }
  /**
   * Method to notify subscribers
   * @param value Object that satisfies the interface
   */
  public notify(value: T): void {
    this.subscribers.forEach((sub) => sub.update(value));
  }
}
