import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { loginSchema } from "../schemas/session.schema";

const sessionRouter = Router();

sessionRouter.post(
	"",
	validationSchemaMiddleware(loginSchema),
	createSessionController
);

export default sessionRouter;
