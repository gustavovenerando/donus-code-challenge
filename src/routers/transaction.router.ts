import { Router } from "express";
import { listUserTransactionsController } from "../controllers/transactions.controller";

const transactionRouter = Router();

transactionRouter.get("", listUserTransactionsController);

export default transactionRouter;
