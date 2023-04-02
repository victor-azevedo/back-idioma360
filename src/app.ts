import { prismaConnectDB, prismaDisconnectDB, redisConnect } from "@/config";
import { AuthRouter, addressRouter, classesRouter, coursesRouter, offeringsRouter } from "@/routes";
import cors from "cors";
import express, { Express } from "express";
import "express-async-errors";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", AuthRouter)
  .use("/address", addressRouter)
  .use("/offerings", offeringsRouter)
  .use("/classes", classesRouter)
  .use("/courses", coursesRouter);

export function init(): Promise<Express> {
  redisConnect();
  prismaConnectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await prismaDisconnectDB();
}

export default app;
