import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedUserLogin } from "../../mocks/session";
import {
	mockedUser,
	mockedUserCpfLessThanElevenDigits,
	mockedUserCpfMoreThanElevenDigits,
	mockedUserCpfWithChar,
	mockedUserNameWithNumber,
	mockedUserWithoutCpf,
	mockedUserWithoutName,
	mockedUserWithoutPassword,
	mockedUserWrongPasswordRequirements,
} from "../../mocks/users";

describe("/users", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.log("Error during Data Source initialization", err);
			});
	});

	afterAll(async () => {
		await connection.destroy;
	});

	test("POST /users - Must be able to create a user", async () => {
		const response = await request(app).post("/users").send(mockedUser);

		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("cpf");
		expect(response.body).toHaveProperty("balance");
		expect(response.status).toBe(201);
	});

	test("POST /users - Should not be able to create a user that already exists", async () => {
		const response = await request(app).post("/users").send(mockedUser);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("User already exists.");
		expect(response.status).toBe(409);
	});

	test("POST /users - Should not be able to create a user without name", async () => {
		const response = await request(app)
			.post("/users")
			.send(mockedUserWithoutName);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("name is a required field");
		expect(response.status).toBe(400);
	});

	test("POST /users - Should not be able to create a user without cpf", async () => {
		const response = await request(app)
			.post("/users")
			.send(mockedUserWithoutCpf);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("cpf is a required field");
		expect(response.status).toBe(400);
	});

	test("POST /users - Should not be able to create a user without password", async () => {
		const response = await request(app)
			.post("/users")
			.send(mockedUserWithoutPassword);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("password is a required field");
		expect(response.status).toBe(400);
	});

	test("POST /users - Should not be able to create a user with name containing number", async () => {
		const response = await request(app)
			.post("/users")
			.send(mockedUserNameWithNumber);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Name must be a string of characters with at least one caracter. Should not contain numbers."
		);
		expect(response.status).toBe(400);
	});

	test("POST /users - Should not be able to create a user with cpf containing characters", async () => {
		const response = await request(app)
			.post("/users")
			.send(mockedUserCpfWithChar);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			'cpf must be a `number` type, but the final value was: `NaN` (cast from the value `"4583368579C"`).'
		);
		expect(response.status).toBe(400);
	});

	test("POST /users - Should not be able to create a user with number of digits from cpf different than 11", async () => {
		const firstResponse = await request(app)
			.post("/users")
			.send(mockedUserCpfMoreThanElevenDigits);

		expect(firstResponse.body).toHaveProperty("message");
		expect(firstResponse.body.message).toEqual(
			"CPF must have exactly 11 digits."
		);
		expect(firstResponse.status).toBe(400);

		const secondResponse = await request(app)
			.post("/users")
			.send(mockedUserCpfLessThanElevenDigits);

		expect(secondResponse.body).toHaveProperty("message");
		expect(secondResponse.body.message).toEqual(
			"CPF must have exactly 11 digits."
		);
		expect(secondResponse.status).toBe(400);
	});

	test("POST /users - Should not be able to create a user with password without minimum of eight characters, at least one letter and one number", async () => {
		const response = await request(app)
			.post("/users")
			.send(mockedUserWrongPasswordRequirements);

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual(
			"Password must have: Minimum eight characters, at least one letter and one number."
		);
		expect(response.status).toBe(400);
	});

	test("GET /users - Must be able to list all users", async () => {
		const loginResponse = await request(app)
			.post("/login")
			.send(mockedUserLogin);

		const response = await request(app)
			.get("/users")
			.set("Authorization", `Bearer ${loginResponse.body.token}`);

		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});

	test("GET /users - Should not be able to list users without authentication", async () => {
		const response = await request(app).get("/users");

		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toEqual("Invalid token.");
		expect(response.status).toBe(401);
	});
});
