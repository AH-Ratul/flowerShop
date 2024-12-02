import FlowerNotifier from "../observer/FlowerNotifier.js";
import { flowers } from "flowerController.js";

// Wrap the flowers array in a Proxy to intercept operations
export const flower = new Proxy(flowers, {
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

flower.push({
  id: 5,
  name: "Sunflower Bliss",
  price: 40,
  description: "Bright and cheerful sunflowers.",
  image: "/img/pngwing11.png",
});
