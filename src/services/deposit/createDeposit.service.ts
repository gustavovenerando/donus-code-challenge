import AppDataSource from "../../data-source";
import Transaction from "../../entities/Transaction.entity";
import User from "../../entities/User.entity";
import AppError from "../../errors/AppError";
import { IDeposit } from "../../interfaces/deposit";

const createDepositService = async ({
	amount,
	currUserId,
}: IDeposit): Promise<void> => {
	const userRepository = AppDataSource.getRepository(User);
	const transactionRepository = AppDataSource.getRepository(Transaction);

	const user = await userRepository.findOneBy({ id: currUserId });

	if (amount > 2000) {
		throw new AppError(400, "Cannot deposit amount greater than R$ 2000.");
	}

	user!.balance += amount;
	await userRepository.update(user!.id, user!);

	const transaction = transactionRepository.create({
		amount,
		type: "Deposit",
		user: user!,
	});

	await transactionRepository.save(transaction);
};

export default createDepositService;
