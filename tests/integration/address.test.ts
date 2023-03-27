import app, { init } from "@/app";
import { prisma } from "@/config";
import { statesUFList } from "@/helpers";
import { faker } from "@faker-js/faker";
import { StateUF } from "@prisma/client";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser, createUserAddress, createUserWithSession, userAddressBody } from "../factories";
import { cleanUsersDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanUsersDb();
});

const server = supertest(app);

describe("POST /user/address", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/user/address");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if 'Authorization' is not in format valid", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/user/address").set("Authorization", `${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/user/address").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/user/address").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 201 and address data when insert data with success", async () => {
      const { token } = await createUserWithSession();
      const addressData = await userAddressBody();

      const response = await server.post("/user/address").set("Authorization", `Bearer ${token}`).send(addressData);

      expect(response.status).toBe(httpStatus.CREATED);
    });

    it("should respond with status 404 when inexistent CEP", async () => {
      const { token } = await createUserWithSession();
      const addressData = await userAddressBody({ postalCode: "00000-000" });

      const response = await server.post("/user/address").set("Authorization", `Bearer ${token}`).send(addressData);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 422 when invalid CEP format", async () => {
      const { token } = await createUserWithSession();
      const addressData = await userAddressBody({
        postalCode: faker.datatype.string(9),
      });

      const response = await server.post("/user/address").set("Authorization", `Bearer ${token}`).send(addressData);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 404 when invalid cityId", async () => {
      const { token } = await createUserWithSession();
      const addressData = await userAddressBody({
        cityId: faker.datatype.number({ max: 999999 }),
      });

      const response = await server.post("/user/address").set("Authorization", `Bearer ${token}`).send(addressData);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  });
});

describe("GET /user/address", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/user/address");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/user/address").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/user/address").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 when receive correct user address", async () => {
      const { token, userId } = await createUserWithSession();
      const userAddress = await createUserAddress(userId);

      const response = await server.get("/user/address").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: userAddress.id,
        street: userAddress.street,
        number: userAddress.number,
        complement: userAddress.complement,
        postalCode: userAddress.postalCode,
        district: userAddress.district,
        cityId: userAddress.cityId,
        city: {
          id: userAddress.city.id,
          name: userAddress.city.name,
          stateId: userAddress.city.stateId,
          state: {
            id: userAddress.city.state.id,
            name: userAddress.city.state.name,
            uf: userAddress.city.state.uf,
          },
        },
        createdAt: userAddress.createdAt.toISOString(),
        updatedAt: userAddress.updatedAt.toISOString(),
      });
    });

    it("should respond with status 404 when there isn't user's address", async () => {
      const { token } = await createUserWithSession();

      const response = await server.get("/user/address").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  });
});

describe("GET /address/states", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/address/states");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/address/states").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/address/states").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and states list", async () => {
      const { token } = await createUserWithSession();

      const states = await prisma.state.findMany({ orderBy: { uf: "asc" } });

      const response = await server.get("/address/states").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(states);
    });
  });
});

describe("GET /address/cities?uf='randomUF'", () => {
  const randomUF = statesUFList[Math.floor(Math.random() * statesUFList.length)] as StateUF;

  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get(`/address/cities?uf=${randomUF}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get(`/address/cities?uf=${randomUF}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/address/cities?uf=${randomUF}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and cities list from random uf", async () => {
      const { token } = await createUserWithSession();

      const cities = await prisma.city.findMany({
        where: { state: { uf: { equals: randomUF } } },
        orderBy: { name: "asc" },
      });

      const response = await server.get(`/address/cities?uf=${randomUF}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(cities);
    });

    it("should respond with status 422 when uf is not valid", async () => {
      const { token } = await createUserWithSession();

      const invalidUF = faker.datatype.string(3) as StateUF;

      const response = await server.get(`/address/cities?uf=${invalidUF}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 400 when uf is not send", async () => {
      const { token } = await createUserWithSession();

      const response = await server.get("/address/cities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
});
