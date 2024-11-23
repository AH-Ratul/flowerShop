import express from "express";
import { login, logout, signup } from "../../controller/authController.js";

export const userRouter = express.Router();

userRouter.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

userRouter.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.get("/flowers", (req, res) => {
  res.render("flowers", { title: "Flowers", user: req.user });
});
