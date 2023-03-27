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

describe("GET /courses", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/courses");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/courses").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/courses").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and courses list", async () => {
      const { token } = await createUserWithSession();

      const courses = await prisma.course.findMany();
      const coursesDateParsed = courses.map((course) => {
        return {
          ...course,
          createdAt: course.createdAt.toISOString(),
          updatedAt: course.updatedAt.toISOString(),
        };
      });

      const response = await server.get("/courses").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(coursesDateParsed);
    });
  });
});
