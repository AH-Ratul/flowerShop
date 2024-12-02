import Subscriber from "./Subscribers.js";

class FlowerNotifier {
  constructor() {
    this.subscribers = [];
  }

  // Add a subscriber
  addSubscriber(email) {
    const subscriber = new Subscriber(email);
    this.subscribers.push(subscriber);
  }

  // Remove a subscriber
  removeSubscriber(email) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber.email !== email
    );
  }

  // Notify all subscribers
  async notifySubscribers(flower) {
    for (const subscriber of this.subscribers) {
      await subscriber.update(flower); // Call update for each subscriber
    }
  }
}

export default new FlowerNotifier();
