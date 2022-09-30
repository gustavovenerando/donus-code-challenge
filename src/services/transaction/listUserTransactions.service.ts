import AppDataSource from "../../data-source";
import User from "../../entities/User.entity";

const listTransactionsService = async (currUserId: string): Promise<User> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOne({
		where: { id: currUserId },
		relations: { transactions: true },
	});

	return user!;
};

export default listTransactionsService;
