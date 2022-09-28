import { Router } from "express";
import {
	createUserController,
	listUsersController,
} from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("", listUsersController);
userRouter.post("", createUserController);

export default userRouter;
