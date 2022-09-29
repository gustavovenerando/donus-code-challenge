import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
	amount0,
	amount1000,
	amount5000,
	amountAsString,
	negativeAmount,
} from "../../mocks/deposit";
import { mockedUserLogin } from "../../mocks/session";
import { mockedUser } from "../../mocks/users";

describe("/deposit", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.log("Error during Data Source initialization", err);
			});

		await request(app).post("/users").send(mockedUser);
	});

	afterAll(async () => {
		await connection.destroy;
	});

	test("POST /deposit - Must be able to deposit amount to user account", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLogin);

		const response = await request(app)
			.post("/deposit")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount1000);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("Deposit done sucessfully.");
		expect(response.status).toBe(201);
	});

	test("POST /deposit - Should not be able to deposit without authentication", async () => {
		const response = await request(app).post("/deposit").send(amount1000);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("Invalid token.");
		expect(response.status).toBe(401);
	});

	test("POST /deposit - Should not be able to deposit a negative amount value", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLogin);

		const response = await request(app)
			.post("/deposit")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(negativeAmount);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Amount value must be greater than 0 and less than or equal to 2000."
		);
		expect(response.status).toBe(400);
	});

	test("POST /deposit - Should not be able to deposit a amount value greater than 2000", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLogin);

		const response = await request(app)
			.post("/deposit")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount5000);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Amount value must be greater than 0 and less than or equal to 2000."
		);
		expect(response.status).toBe(400);
	});

	test("POST /deposit - Should not be able to deposit a amount value equal to 0", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLogin);

		const response = await request(app)
			.post("/deposit")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amount0);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Amount value must be greater than 0 and less than or equal to 2000."
		);
		expect(response.status).toBe(400);
	});

	test("POST /deposit - Should not be able to deposit a amount without being a number", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLogin);

		const response = await request(app)
			.post("/deposit")
			.set("Authorization", `Bearer ${loginResponse.body.token}`)
			.send(amountAsString);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			'amount must be a `number` type, but the final value was: `NaN` (cast from the value `"Aloha"`).'
		);
		expect(response.status).toBe(400);
	});
});
