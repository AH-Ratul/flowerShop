import { app } from "./app.js";
import dotenv from "dotenv";
import mysql from "mysql";
import FlowerNotifier from "./observer/FlowerNotifier.js";
import { addFlower } from "./controller/flowerController.js";

dotenv.config();

const PORT = process.env.PORT;

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// connect to MYSQL database
db.connect((err) => {
  if (err) {
    console.log("mysql Err => ", err);
  } else {
    console.log("Database Connected");
    //FlowerNotifier.loadSubscribers();
  }
});



// Start the Server
app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});
