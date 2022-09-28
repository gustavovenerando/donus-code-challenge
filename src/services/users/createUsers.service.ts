import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import AppError from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcryptjs";

const createUserService = async ({
	name,
	cpf,
	password,
}: IUserRequest): Promise<User> => {
	const userRepository = AppDataSource.getRepository(User);

	const userAlreadyExists = await userRepository.findOneBy({ cpf });

	if (userAlreadyExists) {
		throw new AppError(400, "User already exists.");
	}

	const hashedPassword = await hash(password, 10);

	const user = userRepository.create({
		name,
		cpf,
		password: hashedPassword,
	});

	await userRepository.save(user);

	return user;
};

export default createUserService;
