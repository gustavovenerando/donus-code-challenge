import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import jwt from "jsonwebtoken";

const validationAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token = req.headers.authorization;

	if (!token) {
		throw new AppError(401, "Invalid token.");
	}

	token = token.split(" ")[1];

	jwt.verify(
		token,
		process.env.SECRET_KEY as string,
		(error: any, decoded: any) => {
			if (error) {
				throw new AppError(401, "Invalid token.");
			}

			req.user = {
				id: decoded.sub,
			};

			next();
		}
	);
};

export default validationAuthMiddleware;
