import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./Usersentity";

@Entity("transactions")
class Transaction {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "decimal", precision: 12, scale: 2 })
	amount: number;

	@Column()
	type: string;

	@Column()
	targetUserId: string;

	@ManyToOne(() => User, { eager: true })
	user: User;
}

export default Transaction;
