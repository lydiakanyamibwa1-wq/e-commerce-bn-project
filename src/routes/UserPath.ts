import express, { Router } from "express";
import { getAllUsers, signup } from "../controllers/UserControllers";

// Create routers
const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.get("/all", getAllUsers);

export default userRouter;