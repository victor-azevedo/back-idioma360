import { prismaConnectDB, prismaDisconnectDB, redisConnect } from "@/config";
import { addressRouter, classesRouter, offeringsRouter, signInRouter, signUpRouter, userAddressRouter } from "@/routes";
import cors from "cors";
import express, { Express } from "express";
import "express-async-errors";
import { authenticateToken } from "./middlewares";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/sign-up", signUpRouter)
  .use("/sign-in", signInRouter)
  .use("/user/address", authenticateToken, userAddressRouter)
  .use("/address", addressRouter)
  .use("/offerings", offeringsRouter)
  .use("/classes", classesRouter);

export function init(): Promise<Express> {
  redisConnect();
  prismaConnectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await prismaDisconnectDB();
}

export default app;
