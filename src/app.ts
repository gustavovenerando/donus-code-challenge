import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRouter from "./routers/users.router";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionRouter from "./routers/session.router";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);

app.use(handleErrorMiddleware);

export default app;
