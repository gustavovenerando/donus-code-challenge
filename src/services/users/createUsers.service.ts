import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";
import { IUserRequest } from "../../interfaces/users";

const createUserService = async ({
	name,
	cpf,
	password,
}: IUserRequest): Promise<User> => {
	const userRepository = AppDataSource.getRepository(User);

	// const userAlreadyExists = await userRepository.findOneBy({ cpf });

	const user = userRepository.create({
		name,
		cpf,
		password,
	});

	await userRepository.save(user);

	return user;
};

export default createUserService;
