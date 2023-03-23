import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser, signUpBody } from "../factories";
import { cleanUsersDb } from "../helpers";

beforeAll(async () => {
  await init();
  cleanUsersDb();
});

const server = supertest(app);

describe("POST /sign-up", () => {
  it("should respond with status 201 inserted a new user", async () => {
    const newUserBody = signUpBody();

    const response = await server.post("/sign-up").send(newUserBody);

    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("should respond with status 409 email already registered", async () => {
    const userRegistered = await createUser();
    const newUserBodyWithSameEmail = signUpBody({ email: userRegistered.userEmail });

    const response = await server.post("/sign-up").send(newUserBodyWithSameEmail);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 409 cpf already registered", async () => {
    await createUser();
    const userRegistered = await prisma.user.findFirst();
    const newUserBodyWithSameCpf = signUpBody({ cpf: userRegistered.cpf });

    const response = await server.post("/sign-up").send(newUserBodyWithSameCpf);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 409 phone already registered", async () => {
    const userRegistered = await prisma.user.findFirst();
    const newUserBodyWithSameCpf = signUpBody({ phone: userRegistered.phone });

    const response = await server.post("/sign-up").send(newUserBodyWithSameCpf);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 422 when cpf is not valid", async () => {
    const newUserInvalidBody = signUpBody({ cpf: "123.123.123-12" });

    const response = await server.post("/sign-up").send(newUserInvalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body don't match Sign-up schema", async () => {
    const newUserInvalidBody = signUpBody({ cpf: faker.datatype.string(12) });

    const response = await server.post("/sign-up").send(newUserInvalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
