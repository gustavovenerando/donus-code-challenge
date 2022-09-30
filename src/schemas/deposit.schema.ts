import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAmount } from "../interfaces/transfer";

export const depositSchema: SchemaOf<IAmount> = yup.object().shape({
	amount: yup
		.number()
		.required()
		.test(
			"num-range",
			"Amount value must be greater than 0 and less than or equal to 2000.",
			(num) => num! > 0 && num! <= 2000
		),
});
