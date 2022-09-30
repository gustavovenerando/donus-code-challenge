import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { IUserRequest } from "../../../interfaces/users";
import {
	amount0,
	amount100,
	amount1000,
	negativeAmount,
} from "../../mocks/deposit";
import {
	mockedUserLoginWithBalance,
	mockedUserLoginWithoutBalance,
} from "../../mocks/session";
import {
	mockedTargetIdNotUuidFormat,
	mockedUserWithBalanceCpf,
	mockedUserWithoutBalanceCpf,
	mockedWrongTargetId,
} from "../../mocks/transfer";
import {
	mockedUser,
	mockedUserWithBalance,
	mockedUserWithoutBalance,
} from "../../mocks/users";

describe("/transfer", () => {
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

	test("POST /transfer - Must be able to transfer amount between accounts", async () => {
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

		const response = await request(app)
			.post(`/transfer/${mockedUserWithoutBalance.id}`)
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount100);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Transfer between accounts done sucessfully."
		);
		expect(response.status).toBe(201);
	});

	test("POST /deposit - Should not be able to transfer without authentication", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLoginWithBalance);

		const usersResponse = await request(app)
			.get("/users")
			.set("Authorization", `Bearer ${loginResponse.body.token}`);
		const users = usersResponse.body;

		const mockedUserWithoutBalance = users.find(
			(user: IUserRequest) => user.cpf === mockedUserWithoutBalanceCpf
		);

		const response = await request(app)
			.post(`/transfer/${mockedUserWithoutBalance.id}`)
			.send(amount1000);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("Invalid token.");
		expect(response.status).toBe(401);
	});

	test("POST /transfer - Should not be able to transfer amount between accounts, when balance turn negative", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLoginWithoutBalance);

		const usersResponse = await request(app)
			.get("/users")
			.set("Authorization", `Bearer ${loginResponse.body.token}`);
		const users = usersResponse.body;

		const mockedUserWithtBalance = users.find(
			(user: IUserRequest) => user.cpf === mockedUserWithBalanceCpf
		);

		const response = await request(app)
			.post(`/transfer/${mockedUserWithtBalance.id}`)
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount1000);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"You dont have enough balance to make this transaction. Please, make a deposit to your account."
		);
		expect(response.status).toBe(400);
	});

	test("POST /transfer - Should not be able to transfer amount between accounts, when amount is negative", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLoginWithBalance);

		const usersResponse = await request(app)
			.get("/users")
			.set("Authorization", `Bearer ${loginResponse.body.token}`);
		const users = usersResponse.body;

		const mockedUserWithoutBalance = users.find(
			(user: IUserRequest) => user.cpf === mockedUserWithoutBalanceCpf
		);

		const response = await request(app)
			.post(`/transfer/${mockedUserWithoutBalance.id}`)
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(negativeAmount);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Amount value must be greater than 0."
		);
		expect(response.status).toBe(400);
	});

	test("POST /transfer - Should not be able to transfer amount between accounts, when amount is 0", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLoginWithBalance);

		const usersResponse = await request(app)
			.get("/users")
			.set("Authorization", `Bearer ${loginResponse.body.token}`);
		const users = usersResponse.body;

		const mockedUserWithoutBalance = users.find(
			(user: IUserRequest) => user.cpf === mockedUserWithoutBalanceCpf
		);

		const response = await request(app)
			.post(`/transfer/${mockedUserWithoutBalance.id}`)
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount0);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Amount value must be greater than 0."
		);
		expect(response.status).toBe(400);
	});

	test("POST /transfer - Should not be able to transfer amount between accounts, when targetId is not an UUID format", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLoginWithBalance);

		const response = await request(app)
			.post(`/transfer/${mockedTargetIdNotUuidFormat}`)
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount100);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Target user id does not correspond to UUID format."
		);
		expect(response.status).toBe(400);
	});

	test("POST /transfer - Should not be able to transfer amount between accounts, when target user does not exists", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLoginWithBalance);

		const response = await request(app)
			.post(`/transfer/${mockedWrongTargetId}`)
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount100);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("Target user doesnt exists.");
		expect(response.status).toBe(400);
	});
});
