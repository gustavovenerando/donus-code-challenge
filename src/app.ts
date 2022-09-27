import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRouter from "./routers/users.router";

const app = express();
app.use(express.json());

app.use("/users", userRouter);

export default app;
