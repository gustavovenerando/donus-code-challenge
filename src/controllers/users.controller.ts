import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";
import { instanceToPlain } from "class-transformer";
import { IUserRequest } from "../interfaces/users";

const createUserController = async (req: Request, res: Response) => {
	const { name, cpf, password }: IUserRequest = req.body;

	const user = await createUserService({ name, cpf, password });

	return res.status(201).send(instanceToPlain(user));
};

export default createUserController;
