import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Transaction from "./Transaction.entity";

@Entity("users")
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	cpf: number;

	@Column()
	@Exclude()
	password: string;

	@Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
	balance: number;

	@OneToMany(() => Transaction, (transactions) => transactions.user)
	transactions: Transaction[];
}

export default User;
