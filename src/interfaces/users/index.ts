export interface IUserRequest {
	name: string;
	cpf: number;
	password: string;
}

export interface IUserSchema {
	name: string;
	cpf: string;
	password: string;
}

export interface IUserWithoutProperty {
	name?: string;
	cpf?: number;
	password?: string;
}

export interface IUserWrongNameType {
	name: number;
	cpf: number;
	password: string;
}

export interface IUserWrongCpfType {
	name: string;
	cpf: string;
	password: string;
}

export interface IUserWrongPasswordType {
	name: string;
	cpf: number;
	password: number;
}
