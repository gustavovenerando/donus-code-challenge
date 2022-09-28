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

	const transaction = transactionRepository.create({
		amount,
		targetUserId,
		user: currUser!,
	});

	await transactionRepository.save(transaction);

	currUser!.balance -= amount;
	await userRepository.update(currUser!.id, currUser!);

	targetUser.balance += amount;
	await userRepository.update(targetUser.id, targetUser);
};

export default createTransferService;
