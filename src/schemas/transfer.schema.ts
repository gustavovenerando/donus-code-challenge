import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAmount } from "../interfaces/transfer";

export const transferSchema: SchemaOf<IAmount> = yup.object().shape({
	amount: yup
		.number()
		.required()
		.moreThan(0, "Amount value must be greater than 0."),
});
