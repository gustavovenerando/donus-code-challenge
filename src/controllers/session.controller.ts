import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/session";
import createSessionService from "../services/session/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
	const { cpf, password }: IUserLogin = req.body;

	const token = await createSessionService({ cpf, password });

	res.status(200).send({ token });
};
