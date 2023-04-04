import { prismaConnectDB, prismaDisconnectDB, redisConnect } from "@/config";
import {
  addressRouter,
  authRouter,
  classesRouter,
  coursesRouter,
  enrollmentsRouter,
  offeringsRouter,
  testsRouter,
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
  .use("/tests", testsRouter);

export function init(): Promise<Express> {
  redisConnect();
  prismaConnectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await prismaDisconnectDB();
}

export default app;
