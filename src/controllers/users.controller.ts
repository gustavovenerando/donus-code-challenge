import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";
import { instanceToPlain } from "class-transformer";
import { IUserRequest } from "../interfaces/users";
import listUsersService from "../services/users/listUsers.service";

export const createUserController = async (req: Request, res: Response) => {
	const { name, cpf, password }: IUserRequest = req.body;

	const user = await createUserService({ name, cpf, password });

	return res.status(201).send(instanceToPlain(user));
};

export const listUsersController = async (req: Request, res: Response) => {
	const users = await listUsersService();

	return res.status(200).send(instanceToPlain(users));
};
