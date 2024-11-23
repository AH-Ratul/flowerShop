import express from "express";
import { userRouter } from "./userRouter/userRouter.js";

export const appRouter = express.Router();

appRouter.use("/app", userRouter);
