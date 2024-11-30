import { addFlower } from "../controller/flowerController.js";
import { db } from "../server.js";
import { sendEmailToAll } from "../utils/email.js";
import Subscriber from "./Subscribers.js";

class FlowerNotifier {
    notifySubscribers(flower) {
      sendEmailToAll(flower); 
    }
  }

// class FlowerNotifier {
//   constructor() {
//     this.subscribers = [];
//   }

//   // Load subscribers from the database
//   loadSubscribers(callback) {
//     const query = "SELECT email FROM subscriptions";
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error("Error loading subscribers:", err);
//         return;
//       }
//       this.subscribers = results.map((row) => new Subscriber(row.email));
//       console.log(
//         "Subscribers loaded:",
//         this.subscribers.map((sub) => sub.email)
//       );
//       if (callback) callback();
//     //   addFlower({
//     //     name: "Orchid Charm",
//     //     price: 70,
//     //     description: "Elegant and exotic orchids.",
//     //     image: "/img/pngwing 7.png",
//     //   });  
//     });
//   }

//   // Add a new subscriber
//   addSubscriber(email) {
//     const subscriber = new Subscriber(email);
//     this.subscribers.push(subscriber);
//   }

//   // Notify all subscribers
//   async notifySubscribers(flower) {
//     for (const subscriber of this.subscribers) {
//       await subscriber.update(flower);
//     }
//   }
// }

export default new FlowerNotifier();
