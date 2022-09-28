import { Router } from "express";
import {
	createUserController,
	listUsersController,
} from "../controllers/users.controller";
import validationAuthMiddleware from "../middlewares/validationAuth.middleware";

const userRouter = Router();

userRouter.get("", validationAuthMiddleware, listUsersController);
userRouter.post("", createUserController);

export default userRouter;
