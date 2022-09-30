import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
	mockedUserLogin,
	mockedUserLoginWrongCpf,
	mockedUserLoginWrongPassword,
} from "../../mocks/session";
import { mockedUser } from "../../mocks/users";

describe("/login", () => {
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

	test("POST /login - Must be able to login with the user", async () => {
		const response = await request(app)
			.post("/login")
			.send(mockedUserLogin);

		expect(response.body).toHaveProperty("token");
		expect(response.status).toBe(200);
	});

	test("POST /login - Should not be able to login with wrong cpf", async () => {
		const response = await request(app)
			.post("/login")
			.send(mockedUserLoginWrongCpf);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("Invalid cpf or password");
		expect(response.status).toBe(403);
	});

	test("POST /login - Should not be able to login with wrong password", async () => {
		const response = await request(app)
			.post("/login")
			.send(mockedUserLoginWrongPassword);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("Invalid cpf or password");
		expect(response.status).toBe(403);
	});
});
