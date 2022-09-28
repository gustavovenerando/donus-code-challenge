import { Router } from "express";
import { createTransferController } from "../controllers/transfer.controller";

const transferRouter = Router();

transferRouter.post("/:id", createTransferController);

export default transferRouter;
