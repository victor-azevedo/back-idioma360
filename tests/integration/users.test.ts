import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser, signUp, signUpBody } from "../factories";
import { cleanUsersDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanUsersDb();
});

const server = supertest(app);

describe("POST /auth/sign-up", () => {
  it("should respond with status 201 inserted a new user", async () => {
    const newUserBody = signUpBody();

    const response = await server.post("/auth/sign-up").send(newUserBody);

    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("should respond with status 409 email already registered", async () => {
    const userRegistered = await createUser();
    const newUserBodyWithSameEmail = signUpBody({ email: userRegistered.userEmail });

    const response = await server.post("/auth/sign-up").send(newUserBodyWithSameEmail);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 409 cpf already registered", async () => {
    await createUser();
    const userRegistered = await prisma.user.findFirst();
    const newUserBodyWithSameCpf = signUpBody({ cpf: userRegistered.cpf });

    const response = await server.post("/auth/sign-up").send(newUserBodyWithSameCpf);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 409 phone already registered", async () => {
    const userRegistered = await prisma.user.findFirst();
    const newUserBodyWithSameCpf = signUpBody({ phone: userRegistered.phone });

    const response = await server.post("/auth/sign-up").send(newUserBodyWithSameCpf);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 422 when cpf is not valid", async () => {
    const newUserInvalidBody = signUpBody({ cpf: "123.123.123-12" });

    const response = await server.post("/auth/sign-up").send(newUserInvalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body don't match Sign-up schema", async () => {
    const newUserInvalidBody = signUpBody({ cpf: faker.datatype.string(12) });

    const response = await server.post("/auth/sign-up").send(newUserInvalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});

describe("POST /auth/sign-in", () => {
  it("should respond with status 200 when sign-in success", async () => {
    const password = faker.internet.password(8);
    const { userEmail, role, user } = await createUser(signUp({ password }));

    const response = await server.post("/auth/sign-in").send({ email: userEmail, password });

    const jwtDecoded = jwt.decode(response.body.token) as {
      userId: number;
      role: "student";
      iat: number;
      exp: number;
    };

    expect(response.status).toBe(httpStatus.OK);
    expect(user.id).toEqual(jwtDecoded.userId);
    expect(role).toEqual(jwtDecoded.role);
  });

  it("should respond with status 401 when receive incorrect password", async () => {
    const { userEmail } = await createUser(signUp());

    const wrongPassword = faker.internet.password(10);
    const response = await server.post("/auth/sign-in").send({ email: userEmail, password: wrongPassword });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 404 email unregistered", async () => {
    await cleanUsersDb();
    const fakerEmail = faker.internet.email();
    const password = faker.internet.password(10);

    const response = await server.post("/auth/sign-in").send({ email: fakerEmail, password });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 422 when body don't match Sign-in schema", async () => {
    const invalidEmail = faker.datatype.string(6);
    const invalidPassword = faker.internet.password(4);

    const response = await server.post("/auth/sign-in").send({ email: invalidEmail, password: invalidPassword });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when email don't match Sign-in schema", async () => {
    const invalidEmail = faker.datatype.string(6);
    const password = faker.internet.password(8);

    const response = await server.post("/auth/sign-in").send({ email: invalidEmail, password });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when password don't match Sign-in schema", async () => {
    const email = faker.internet.email();
    const invalidPassword = faker.internet.password(18);

    const response = await server.post("/auth/sign-in").send({ email, password: invalidPassword });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
