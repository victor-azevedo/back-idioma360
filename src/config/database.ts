import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;
export function prismaConnectDB(): void {
  prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
}

export async function prismaDisconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
