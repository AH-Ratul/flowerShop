import { createUser, getUserByEmail, getUserById } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createSendToken = (user, statusCode, message, res) => {
  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );

  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, cookieOptions);

  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: { user },
  });
};

//------------------------- USER SIGNUP ---------------------------
export const signup = (req, res) => {
  const { password, passwordConfirm, ...userData } = req.body;

  // validate if password and passwordConfirm are same
  if (password !== passwordConfirm) {
    return callback(new Error("Passwords doesn't Match"));
  }

  createUser({ ...userData, password }, (err) => {
    if (err) return res.status(500).json({ error: "Error register user" });
    res.redirect("/users/login");
  });
};

//------------------ LOGIN Credentials ----------------------------
export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    //
    getUserByEmail(email, (err, results) => {
      console.log(results[0]);

      if (err || results.length === 0)
        return res.status(401).json({ error: "Invalid email or password" });

      const user = results[0];

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.log("error during comparison password", err);
          return res.status(500).json({ error: "internal server error" });
        }

        // if passwords aren't match
        if (!match)
          return res.status(401).json({ error: "Invalid email or password.." });

        createSendToken(user, 200, "Login Successfull", res);

        return res.redirect("/");
      });
    });
  } catch (error) {
    console.log("ERR ->", error);
  }
};

//------------------ Authenticate -------------------
export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/users/login");
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.redirect("/users/login");
    }

    getUserById(decoded.userId, (err, results) => {
      if (err || results.length === 0) {
        return res.redirect("/users/login");
      }

      req.user = results[0];
      next();
    });
  });
};
