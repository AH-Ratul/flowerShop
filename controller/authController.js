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
    sameSite: "none",
  };

  res.cookie("token", token, cookieOptions);

  user.password = undefined;
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
    res.redirect("/app/login");
  });
};

//------------------ LOGIN Credentials ----------------------------
export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    //
    getUserByEmail(email, (err, results) => {
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

//------------------ LOG OUT -----------------------
export const logout = (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/");
};

//------------------ GLOBAL USER -------------------
export const globalUser = (req, res, next) => {
  try {
    let token;

    if (req.headers.cookie && req.headers.cookie.startsWith("token=")) {
      token = req.headers.cookie.split("=")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      req.user = null;
      return next();
    }

    // verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    getUserById(decoded.userId, (err, results) => {
      if (err || results.length === 0) {
        req.user = null;
        return next();
      }

      results[0].password = undefined;

      req.user = results[0];
      next();
    });
  } catch (error) {
    console.log("error in global user ->", error);
    req.user = null;
    next();
  }
};

//---------------------- Authenticate -----------------------
export const authenticate = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/app/login");
  }
  next();
};
