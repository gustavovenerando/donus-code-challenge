import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import AppError from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/session";
import jwt from "jsonwebtoken";

const createSessionService = async ({
	cpf,
	password,
}: IUserLogin): Promise<string> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOneBy({ cpf });

	if (!user) {
		throw new AppError(403, "Invalid cpf or password");
	}

	const matchPassword = await compare(password, user.password);

	if (!matchPassword) {
		throw new AppError(403, "Invalid cpf or password");
	}

	const token = jwt.sign({}, process.env.SECRET_KEY as string, {
		subject: user.id,
		expiresIn: "2h",
	});

	return token;
};

export default createSessionService;
