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

export const mockedUserWithoutName: IUserWithoutProperty = {
	cpf: 45833685791,
	password: "Aloha123456",
};

export const mockedUserWithoutCpf: IUserWithoutProperty = {
	name: "Leandro",
	password: "Aloha123456",
};

export const mockedUserWithoutPassword: IUserWithoutProperty = {
	name: "Leandro",
	cpf: 45833685791,
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
	cpf: 45833685791,
	password: "Aloha123456",
};

export const mockedUserNameAsNumber: IUserWrongNameType = {
	name: 1254,
	cpf: 45833685791,
	password: "Aloha123456",
};

export const mockedUserCpfAsString: IUserWrongCpfType = {
	name: "Leandro",
	cpf: "45833685791",
	password: "Aloha123456",
};

export const mockedUserPasswordAsNumber: IUserWrongPasswordType = {
	name: "Leandro",
	cpf: 45833685791,
	password: 654231,
};
