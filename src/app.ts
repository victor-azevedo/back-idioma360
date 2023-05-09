import { prismaConnectDB, prismaDisconnectDB } from "@/config";
import {
  addressRouter,
  authRouter,
  classesRouter,
  coursesRouter,
  enrollmentsRouter,
  offeringsRouter,
  questionsRouter,
  testsRouter,
  usersRouter,
} from "@/routes";
import cors from "cors";
import express, { Express } from "express";
import "express-async-errors";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", authRouter)
  .use("/address", addressRouter)
  .use("/classes", classesRouter)
  .use("/courses", coursesRouter)
  .use("/enroll", enrollmentsRouter)
  .use("/offerings", offeringsRouter)
  .use("/tests", testsRouter)
  .use("/questions", questionsRouter)
  .use("/users", usersRouter);

export function init(): Promise<Express> {
  // TODO: connect Redis
  prismaConnectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await prismaDisconnectDB();
}

export default app;
