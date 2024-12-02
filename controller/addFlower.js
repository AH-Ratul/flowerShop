import FlowerNotifier from "../observer/FlowerNotifier.js";

// Wrap the flowers array in a Proxy to intercept operations
export const flower = new Proxy([], {
  set(target, property, value) {
    // Detect when a new flower is added
    if (!isNaN(property)) {
      console.log("New flower added:", value);

      // Notify subscribers
      FlowerNotifier.notifySubscribers(value);
    }
 
    // Update the original array
    target[property] = value;
    return true;
  },
});

