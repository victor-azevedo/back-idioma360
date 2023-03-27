import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser, createUserWithSession } from "../factories";
import { cleanUsersDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanUsersDb();
});

const server = supertest(app);

describe("GET /offerings", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/offerings");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/offerings").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/offerings").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and offerings list", async () => {
      const { token } = await createUserWithSession();

      const offerings = await prisma.offering.findMany();
      const offeringsDateParsed = offerings.map((offering) => {
        return {
          id: offering.id,
          startDate: offering.startDate.toISOString(),
          endDate: offering.endDate.toISOString(),
          testDate: offering.testDate.toISOString(),
          testStartTime: offering.testStartTime.toISOString(),
          testEndTime: offering.testEndTime.toISOString(),
          resultDate: offering.resultDate.toISOString(),
          classeId: offering.classeId,
          createdAt: offering.createdAt.toISOString(),
          updatedAt: offering.updatedAt.toISOString(),
        };
      });

      const response = await server.get("/offerings").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(offeringsDateParsed);
    });
  });
});
