import { Request, Response } from "express";
import { IAmount } from "../interfaces/transfer";
import createDepositService from "../services/deposit/createDeposit.service";

export const createDepositController = async (req: Request, res: Response) => {
	const { amount }: IAmount = req.body;
	const currUserId: string = req.user.id;

	await createDepositService({ amount, currUserId });

	res.status(201).send({ message: "Deposit done sucessfully." });
};
