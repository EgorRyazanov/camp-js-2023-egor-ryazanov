import { Observer } from './types';

/** Publisher. */
export class Publisher<T> {
	/** Subscribers. */
	protected readonly subscribers: Observer<T>[] = [];

	/**
	 * Subscribes to be notified about changes.
	 * @param newSubscriber Entity that satisfies the interface.
	 */
	public subscribe(newSubscriber: Observer<T>): void {
		const subscriberIndex = this.subscribers.findIndex((subscriber) => subscriber === newSubscriber);
		if (subscriberIndex === -1) {
			this.subscribers.push(newSubscriber);
		}
	}

	/**
	 * Unsubscribes to not be notified about changes.
	 * @param targetSubscriber Entity that satisfies the interface.
	 */
	public unsubscribe(targetSubscriber: Observer<T>): void {
		const subscriberIndex = this.subscribers.findIndex((subscriber) => subscriber === targetSubscriber);
		if (subscriberIndex !== -1) {
			this.subscribers.splice(subscriberIndex, 1);
		}
	}

	/**
	 * Notifies subscribers.
	 * @param value Object that satisfies the interface of generator.
	 */
	public notify(value: T): void {
		this.subscribers.forEach((subscriber) => subscriber.update(value));
	}
}
