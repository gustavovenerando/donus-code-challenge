import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";

const sessionRouter = Router();

sessionRouter.post("", createSessionController);

export default sessionRouter;
