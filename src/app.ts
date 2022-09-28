import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRouter from "./routers/users.router";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionRouter from "./routers/session.router";
import validationAuthMiddleware from "./middlewares/validationAuth.middleware";
import transferRouter from "./routers/transfer.router";
import { types } from "pg";
import transactionRouter from "./routers/transaction.router";

//TypeORM converte números para string ao fazer request. Solucao abaixo, ao invés de converter todo o tempo
types.setTypeParser(types.builtins.NUMERIC, (value: string): number =>
	parseFloat(value)
);

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/transfer", validationAuthMiddleware, transferRouter);
app.use("/transactions", validationAuthMiddleware, transactionRouter);

app.use(handleErrorMiddleware);

export default app;

//quarta
//transfer route(patch)
//deposit route(patch)
//yup, validaçao de dados
//testes

//quinta
//read.me
//docker
