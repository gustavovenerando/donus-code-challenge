import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { IUserRequest } from "../../../interfaces/users";
import { amount100, amount1000 } from "../../mocks/deposit";
import { mockedUserLoginWithBalance } from "../../mocks/session";
import { mockedUserWithoutBalanceCpf } from "../../mocks/transfer";
import {
	mockedUser,
	mockedUserWithBalance,
	mockedUserWithoutBalance,
} from "../../mocks/users";

describe("/transactions", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.log("Error during Data Source initialization", err);
			});

		await request(app).post("/users").send(mockedUserWithBalance);
		await request(app).post("/users").send(mockedUserWithoutBalance);
	});

	afterAll(async () => {
		await connection.destroy;
	});

	test("GET /transactions/user - Must be able to list all transactions done from user", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLoginWithBalance);

		await request(app)
			.post("/deposit")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount1000);

		const usersResponse = await request(app)
			.get("/users")
			.set("Authorization", `Bearer ${loginResponse.body.token}`);
		const users = usersResponse.body;

		const mockedUserWithoutBalance = users.find(
			(user: IUserRequest) => user.cpf === mockedUserWithoutBalanceCpf
		);

		await request(app)
			.post(`/transfer/${mockedUserWithoutBalance.id}`)
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount100);

		const response = await request(app)
			.get("/transactions/user")
			.set("Authorization", `Bearer ${loginResponse.body.token}`);

		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("cpf");
		expect(response.body).toHaveProperty("balance");
		expect(response.body).toHaveProperty("transactions");
		expect(response.body.transactions).toHaveLength(2);
		expect(response.status).toBe(200);
	});

	test("GET /transactions/user - Should not be able to list user transactions without authentication", async () => {
		const response = await request(app).get("/transactions/user");

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("Invalid token.");
		expect(response.status).toBe(401);
	});
});
