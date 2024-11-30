import express from "express";
import { login, logout, signup } from "../../controller/authController.js";
import {
  flowers,
  getFlowerById,
  processCheckout,
  processingOrder,
  processInvoice,
} from "../../controller/flowerController.js";
import { subscribeUser } from "../../controller/subscribeController.js";

export const userRouter = express.Router();

userRouter.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

userRouter.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

userRouter.get("/profile", (req, res) => {
  res.render("profile", { title: "Profile", user: req.user });
});

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.get("/flowers", (req, res) => {
  res.render("flowers", { flowers, title: "Flowers", user: req.user });
});
userRouter.get("/checkout/:id", getFlowerById);
userRouter.post("/checkout", processCheckout);

userRouter.get("/processing/:order_id", processingOrder);
userRouter.get("/invoice/:order_id", processInvoice);

userRouter.post("/subscribe", subscribeUser);
