import { Router } from "express";
import { createDepositController } from "../controllers/deposit.controller";

const depositRouter = Router();

depositRouter.post("", createDepositController);

export default depositRouter;
