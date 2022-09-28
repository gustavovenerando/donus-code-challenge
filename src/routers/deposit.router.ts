import { Router } from "express";
import { createDepositController } from "../controllers/deposit.controller";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { depositSchema } from "../schemas/deposit.schema";

const depositRouter = Router();

depositRouter.post(
	"",
	validationSchemaMiddleware(depositSchema),
	createDepositController
);

export default depositRouter;
