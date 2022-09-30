import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import AppError from "../errors/AppError";

const validationSchemaMiddleware =
	(schema: AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;

			const validatedData = await schema.validate(data);

			req.body = validatedData;

			next();
		} catch (error: any) {
			throw new AppError(400, error.errors?.join(", "));
		}
	};

export default validationSchemaMiddleware;
