import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

export let prisma: PrismaClient;
export function prismaConnectDB(): void {
  prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
  // eslint-disable-next-line no-console
  console.log(chalk.bgGreen("Database connection OK!!!"));
}

export async function prismaDisconnectDB(): Promise<void> {
  try {
    await prisma?.$disconnect();
    // eslint-disable-next-line no-console
    console.log(chalk.bgGreen("Database disconnected"));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(chalk.bgRed("Database disconnect Error!!!\n"), error);
  }
}
