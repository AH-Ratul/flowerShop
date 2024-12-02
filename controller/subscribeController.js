import FlowerNotifier from "../observer/FlowerNotifier.js";
import { db } from "../server.js";
import { flower } from "./addFlower.js";

export const subscribeUser = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  // Check if the email is already subscribed
  const checkQuery = "SELECT * FROM subscriptions WHERE email = ?";
  db.query(checkQuery, [email], (checkErr, results) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).send("Server error");
    }

    if (results.length > 0) {
      return res.status(409).send("You are already subscribed.");
    }

    // Add subscriber to the database
    const query = "INSERT INTO subscriptions (email) VALUES (?)";
    db.query(query, [email], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to subscribe");
      }

      // Add the email to the notifier
      FlowerNotifier.addSubscriber(email);

      res.send("Thank You");
    });
  });
};

export const getRecipientsFromDB = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT email FROM subscriptions";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching recipients from DB:", err);
        return reject(err);
      }

      const emails = results.map((row) => row.email);
      resolve(emails);

      //FlowerNotifier.addSubscriber(emails);
    });
  });
};

export const loadSubscribers = async () => {
  try {
    const emails = await getRecipientsFromDB();
    emails.forEach((email) => FlowerNotifier.addSubscriber(email));
    console.log("All subscribers loaded from the database.");

    // flower.push({
    //   id: 5,
    //   name: "Sunflower Bliss",
    //   price: 40,
    //   description: "Bright and cheerful sunflowers.",
    //   image: "/img/pngwing11.png",
    // });
  } catch (error) {
    console.error("Error loading subscribers:", error);
  }
};
