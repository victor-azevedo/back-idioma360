import chalk from "chalk";
import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL,
});

export async function redisConnect() {
  try {
    const redisConnection = await redis.connect();
    // eslint-disable-next-line no-console
    console.log(chalk.bgBlue("Redis Connection Ok!"));
    return redisConnection;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(chalk.bgRed("Redis Connection Error!!!\n"), error);
  }
}
