import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";

@Entity("transactions")
class Transaction {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "decimal", precision: 12, scale: 2 })
	amount: number;

	@Column()
	targetUserId: string;

	@ManyToOne(() => User, { eager: false })
	user: User;
}

export default Transaction;
