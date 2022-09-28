import AppDataSource from "../../data-source";
import Transaction from "../../entities/Transaction.entity";
import User from "../../entities/User.entity";
import AppError from "../../errors/AppError";
import { ITransferService } from "../../interfaces/transfer";

const createTransferService = async ({
	targetUserId,
	currUserId,
	amount,
}: ITransferService): Promise<void> => {
	const userRepository = AppDataSource.getRepository(User);
	const transactionRepository = AppDataSource.getRepository(Transaction);

	const targetUser = await userRepository.findOneBy({ id: targetUserId });
	const currUser = await userRepository.findOneBy({ id: currUserId });

	if (!targetUser) {
		throw new AppError(400, "Target user doesnt exists.");
	}

	currUser!.balance -= amount;

	if (currUser!.balance < 0) {
		throw new AppError(
			400,
			"You dont have enough balance to make this transaction. Please, make a deposit to your account."
		);
	}

	await userRepository.update(currUser!.id, currUser!);

	targetUser.balance += amount;
	await userRepository.update(targetUser.id, targetUser);

	const transaction = transactionRepository.create({
		amount,
		targetUserId,
		type: "Transfer",
		user: currUser!,
	});

	await transactionRepository.save(transaction);
};

export default createTransferService;
