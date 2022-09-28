import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/users";

export const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
	name: yup.string().required(),
	cpf: yup
		.number()
		.required()
		.test(
			"len",
			"CPF must have exactly 11 digits.",
			(num) => num?.toString().length === 11
		),
	password: yup
		.string()
		.required()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			"Password must have: Minimum eight characters, at least one letter and one number."
		),
});
