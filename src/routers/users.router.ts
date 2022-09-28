import { Router } from "express";
import {
	createUserController,
	listUsersController,
} from "../controllers/users.controller";
import validationAuthMiddleware from "../middlewares/validationAuth.middleware";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { userSchema } from "../schemas/user.schema";

const userRouter = Router();

userRouter.get("", validationAuthMiddleware, listUsersController);
userRouter.post(
	"",
	validationSchemaMiddleware(userSchema),
	createUserController
);

export default userRouter;
