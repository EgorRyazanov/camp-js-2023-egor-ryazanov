import { Observer } from './types';

/** Publisher. */
export abstract class Publisher<T> {
	/** Subscribers. */
	private readonly subscribers: Observer<T>[] = [];

	/**
	 * Subscribes to be notified about changes.
	 * @param newSubscriber Entity that satisfies the interface.
	 */
	public subscribe(newSubscriber: Observer<T>): void {
		if (!this.subscribers.includes(newSubscriber)) {
			this.subscribers.push(newSubscriber);
		}
	}

	/**
	 * Unsubscribes to not be notified about changes.
	 * @param targetSubscriber Entity that satisfies the interface.
	 */
	public unsubscribe(targetSubscriber: Observer<T>): void {
		if (!this.subscribers.includes(targetSubscriber)) {
			const subscriberIndex = this.subscribers.findIndex(subscriber => subscriber === targetSubscriber);
			this.subscribers.splice(subscriberIndex, 1);
		}
	}

	abstract update(value: Observer<T>): void

	/**
	 * Notifies subscribers.
	 * @param value Object that satisfies the interface of generator.
	 */
	public notify(value: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(value));
	}
}
