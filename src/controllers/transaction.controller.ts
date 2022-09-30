import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listTransactionsService from "../services/transaction/listUserTransactions.service";

export const listUserTransactionsController = async (
	req: Request,
	res: Response
) => {
	const currUserId: string = req.user.id;

	const userTransactions = await listTransactionsService(currUserId);

	return res.status(200).send(instanceToPlain(userTransactions));
};
