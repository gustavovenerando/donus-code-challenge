import { Request, Response } from "express";
import { IAmount } from "../interfaces/transfer";
import createTransferService from "../services/transfer/createTransfer.service";

export const createTransferController = async (req: Request, res: Response) => {
	const targetUserId: string = req.params.id;
	const currUserId: string = req.user.id;
	const { amount }: IAmount = req.body;

	await createTransferService({ targetUserId, currUserId, amount });

	return res
		.status(201)
		.send({ message: "Transfer between accounts done sucessfully." });
};
