import * as yup from "yup";
import { IUserLogin } from "../interfaces/session";
import { SchemaOf } from "yup";

export const loginSchema: SchemaOf<IUserLogin> = yup.object().shape({
	cpf: yup
		.number()
		.required()
		.test(
			"len",
			"CPF must have exactly 11 digits.",
			(num) => num?.toString().length === 11
		),
	password: yup.string().required(),
});
