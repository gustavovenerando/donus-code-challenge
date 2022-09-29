import {
	IUserRequest,
	IUserWithoutProperty,
	IUserWrongCpfType,
	IUserWrongNameType,
	IUserWrongPasswordType,
} from "../../../interfaces/users";

export const mockedUser: IUserRequest = {
	name: "Leandro",
	cpf: 45833685791,
	password: "Aloha123456",
};

export const mockedUserWithBalance: IUserRequest = {
	name: "Alessandra",
	cpf: 45833685444,
	password: "Aloha123456",
};

export const mockedUserWithoutBalance: IUserRequest = {
	name: "Felipe",
	cpf: 45833685333,
	password: "Aloha123456",
};

export const mockedUserWithoutName: IUserWithoutProperty = {
	cpf: 45833685796,
	password: "Aloha123456",
};

export const mockedUserWithoutCpf: IUserWithoutProperty = {
	name: "Leandro",
	password: "Aloha123456",
};

export const mockedUserWithoutPassword: IUserWithoutProperty = {
	name: "Leandro",
	cpf: 45833685796,
};

export const mockedUserCpfMoreThanElevenDigits: IUserRequest = {
	name: "Leandro",
	cpf: 45833545464876416874,
	password: "Aloha123456",
};

export const mockedUserCpfLessThanElevenDigits: IUserRequest = {
	name: "Leandro",
	cpf: 4583,
	password: "Aloha123456",
};

export const mockedUserWrongPasswordRequirements: IUserRequest = {
	name: "Leandro",
	cpf: 45833685792,
	password: "Al0",
};

export const mockedUserNameWithNumber: IUserWrongNameType = {
	name: 1254,
	cpf: 45833685793,
	password: "Aloha123456",
};

export const mockedUserCpfWithChar: IUserWrongCpfType = {
	name: "Leandro",
	cpf: "4583368579C",
	password: "Aloha123456",
};

export const mockedUserPasswordAsNumber: IUserWrongPasswordType = {
	name: "Leandro",
	cpf: 45833685794,
	password: 654231,
};
