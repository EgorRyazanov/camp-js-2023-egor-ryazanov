import { Observer } from './types';

/** Publisher. */
export class Publisher<T> {
	/** Subscribers. */
	protected readonly subscribers: Observer<T>[] = [];

	/**
	 * Subscribes to be notified about changes.
	 * @param subscriber Entity that satisfies the interface.
	 */
	public subscribe(subscriber: Observer<T>): void {
		const subIdx = this.subscribers.findIndex(sub => sub === subscriber);
		if (subIdx === -1) {
			this.subscribers.push(subscriber);
		}
	}

	/**
	 * Unsubscribes to not be notified about changes.
	 * @param subscriber Entity that satisfies the interface.
	 */
	public unsubscribe(subscriber: Observer<T>): void {
		const subIdx = this.subscribers.findIndex(sub => sub === subscriber);
		if (subIdx !== -1) {
			this.subscribers.splice(subIdx, 1);
		}
	}

	/**
	 * Notifies subscribers.
	 * @param value Object that satisfies the interface of generator.
	 */
	public notify(value: T): void {
		this.subscribers.forEach(sub => sub.update(value));
	}
}
