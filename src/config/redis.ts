import chalk from "chalk";
import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL,
});

export async function redisConnect() {
  try {
    // eslint-disable-next-line no-console
    console.log(chalk.bgBlue("Redis Connection Ok!"));
    return await redis.connect();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(chalk.bgRed("Redis Connection Error!!!"));
  }
}
