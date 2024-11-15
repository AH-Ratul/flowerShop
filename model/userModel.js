import { db } from "../server.js";
import bcrypt from "bcrypt";

// get user by Email
export const getUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email=?", [email], callback);
};

// ger user by ID
export const getUserById = (userId, callback) => {
  db.query("SELECT * FROM users WHERE userId=?", [userId], callback);
};

// create a new user
export const createUser = async (user, callback) => {
  try {
    const { name, email, phone, date_Of_Birth, password } = user;

    // hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert new user
    db.query(
      `INSERT INTO users(name, email, phone, date_Of_Birth, password) VALUES(?, ?, ?, ?, ?)`,
      [name, email, phone, date_Of_Birth, hashedPassword],
      (err, results) => {
        if (err) {
          console.log("database error", err);
          return callback(err);
        }
        callback(null, results);
      }
    );
  } catch (error) {
    console.log("error in create user", error);
    return callback(error);
  }
};
