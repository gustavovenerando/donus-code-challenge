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

	transactionRepository.create({
		amount,
		targetUserId,
		user: currUser!,
	});

	currUser!.balance -= amount;
	await userRepository.update(currUser!.id, currUser!);
	console.log(currUser);

	targetUser.balance += amount;
	await userRepository.update(targetUser.id, targetUser);
	console.log(targetUser);
};

export default createTransferService;
