import { Router } from "express";
import { createTransferController } from "../controllers/transfer.controller";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { transferSchema } from "../schemas/transfer.schema";

const transferRouter = Router();

transferRouter.post(
	"/:id",
	validationSchemaMiddleware(transferSchema),
	createTransferController
);

export default transferRouter;
