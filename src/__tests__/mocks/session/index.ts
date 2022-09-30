import { IUserLogin } from "../../../interfaces/session";

export const mockedUserLogin: IUserLogin = {
	cpf: 45833685791,
	password: "Aloha123456",
};

export const mockedUserLoginWithBalance: IUserLogin = {
	cpf: 45833685444,
	password: "Aloha123456",
};

export const mockedUserLoginWithoutBalance: IUserLogin = {
	cpf: 45833685333,
	password: "Aloha123456",
};

export const mockedUserLoginWrongCpf: IUserLogin = {
	cpf: 45833685888,
	password: "Aloha123456",
};

export const mockedUserLoginWrongPassword: IUserLogin = {
	cpf: 45833685791,
	password: "Aloha123444",
};
