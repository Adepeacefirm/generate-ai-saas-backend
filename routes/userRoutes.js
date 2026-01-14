import express from "express";
import { auth } from "../middlewares/auth.js";
import { getPublishedCreations, getUSerCreations, toggleLikeCreation } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/get-user-creations").get(auth, getUSerCreations)
userRouter.route("/get-published-creations").get(auth, getPublishedCreations)
userRouter.route("/toggle-like-creation").post(auth, toggleLikeCreation)

export default userRouter
