import { Router } from "express";
import { listUserTransactionsController } from "../controllers/transaction.controller";

const transactionRouter = Router();

transactionRouter.get("/user", listUserTransactionsController);

export default transactionRouter;
