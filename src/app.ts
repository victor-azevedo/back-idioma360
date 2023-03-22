import { loadEnv } from "@/config";
import cors from "cors";
import express from "express";
import "express-async-errors";

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"));

export default app;
